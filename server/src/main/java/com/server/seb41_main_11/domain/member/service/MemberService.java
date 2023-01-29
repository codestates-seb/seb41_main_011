package com.server.seb41_main_11.domain.member.service;

import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.constant.Status;
import com.server.seb41_main_11.domain.member.dto.MemberDto;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.repository.MemberRepository;
import com.server.seb41_main_11.global.config.JasyptConfig;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.AuthenticationException;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import com.server.seb41_main_11.global.error.exception.EntityNotFoundException;
import com.server.seb41_main_11.global.jwt.dto.JwtTokenDto;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final TokenManager tokenManager;

    private final JasyptConfig jasyptConfig; //암호화, 복호화를 위한 di

    /**
     * 회원가입(카카오 로그인 시 사용)
     */
    public Member registerMember(Member member) {
        validateDuplicateMember(member); //동일 이메일있는지 확인
        return memberRepository.save(member);
    }


    /**
     * 회원가입(사이트 자체 회원가입)
     */
    public Member createMember(Member member){
        validateDuplicateMember(member); //동일 이메일있는지 확인

        member.setMemberType(MemberType.DEFAULT); //자체 회원가입
        member.setRole(Role.USER);
        member.setPassword(encryptPassword(member.getPassword())); //비밀번호 암호화

        return memberRepository.save(member);
    }

    /**
     * 회원 로그인(사이트 자체 로그인)
     */
    public MemberDto.LoginResponse login(Member member) {
        JwtTokenDto jwtTokenDto;
        Optional<Member> optioanlMember = findMemberByEmail(member.getEmail()); //이메일로 회원 검색

        if(optioanlMember.isEmpty()) {
            throw new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS); //존재 안하면 예외 처리
        }

        Member findMember = optioanlMember.get();

        if(findMember.getStatus() == Status.DELETE){
            throw new EntityNotFoundException(ErrorCode.MEMBER_WITHDRAWN);
        }

        if(findMember.getRole() == Role.ADMIN){
            if(!findMember.getPassword().equals(member.getPassword())){
                throw new AuthenticationException(ErrorCode.WRONG_PASSWROD);
            }
        }
        else if(!decryptPassword(findMember.getPassword()).equals(member.getPassword())){
            throw new AuthenticationException(ErrorCode.WRONG_PASSWROD); //비밀번호 일치 하지 않으면 예외처리
        }

        decryptPassword(findMember.getPassword());

        jwtTokenDto = tokenManager.createJwtTokenDto(findMember.getMemberId(), findMember.getRole()); //토큰 생성

        findMember.updateRefreshToken(jwtTokenDto); //토큰값 설정
        memberRepository.save(findMember); //db에 리프레쉬 토큰 업데이트

        return MemberDto.LoginResponse.of(jwtTokenDto, findMember.getRole());
    }

    /**
     * 회원 목록 조회
     */
    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size) {
        Page<Member> findAllMember = memberRepository.findAll(
                PageRequest.of(page,size, Sort.by("memberId").descending())
        );
        return findAllMember;
    }
    /**
     * 회원 수정 (카카오 회원은 비밀번호 수정 불가능)
     */
    public Member updateMember(Member member) {

        Member preMember = findVerifiedMemberByMemberId(member.getMemberId()); //멤버 조회

        if(member.getPassword() == null){ //닉네임만 수정
            Optional.ofNullable(member.getNickName())
                    .ifPresent(nickName -> preMember.setNickName(nickName));
        }else{ //비밀번호도 같이 수정
            Optional.ofNullable(member.getNickName())
                    .ifPresent(nickName -> preMember.setNickName(nickName));

            String password = encryptPassword(member.getPassword()); //새 비밀번호 암호화
            preMember.setPassword(password); //암호화된 비밀번호 설정
        }

        Optional.ofNullable(member.getBirth())
                .ifPresent(birth -> preMember.setBirth(birth));

        return memberRepository.save(preMember);
    }

    /**
     * 회원 삭제 (마이페이지를 통해서 삭제하기 때문에 별도 인증 과정 X)
     */
    public Member deleteMember(Long memberId) {
        Member member = findVerifiedMemberByMemberId(memberId);
        member.setStatus(Status.DELETE);

        return memberRepository.save(member);
    }

    /**
     * 로그인 회원 정보 조회
     */
    @Transactional(readOnly = true)
    public Member getLoginMember(HttpServletRequest httpServletRequest){
        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        String accessToken = authorizationHeader.split(" ")[1]; // Bearer askdhqwdkjwqbdkjwqbdkjqwbdkjwqb

        Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
        Long memberId = Long.valueOf( (Integer) tokenClaims.get("memberId"));
        return findVerifiedMemberByMemberId(memberId);
    }

    /**
     * 로그인한 회원 Role 조회(USER OR counselor)
     * */
    @Transactional(readOnly = true)
        public Role getLoginRole(HttpServletRequest httpServletRequest) {
            String authorizationHeader = httpServletRequest.getHeader("Authorization");
            String accessToken = authorizationHeader.split(" ")[1];

            Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
        String role = (String) tokenClaims.get("role");
        if(role.equals("USER")) {
            return (Role) Enum.valueOf(Role.class, role);
        }else if (role.equals("COUNSELOR")){
            return (Role) Enum.valueOf(Role.class, role);
        }else{
            return (Role) Enum.valueOf(Role.class, "ADMIN");
        }
    }


    /**
     * 회원 중복 확인(있으면 예외)
     */
    private void validateDuplicateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if(optionalMember.isPresent()) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
            //동일 이메일 있는 경우 에러 처리
        }
    }

    /**
     * 회원 존재 확인(없으면 예외)
     */
    @Transactional(readOnly = true)
    public Member findVerifiedMemberByMemberId(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS));
    }

    @Transactional(readOnly = true)
    public Optional<Member> findMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public Member findMemberByRefreshToken(String refreshToken) {
        Member member = memberRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));
        LocalDateTime tokenExpirationTime = member.getTokenExpirationTime();
        if(tokenExpirationTime.isBefore(LocalDateTime.now())) {
            throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_EXPIRED); //refresh 토큰이 만료됐을 경우
        }
        return member;
    }

    /**
     * 비밀번호 암호화
     */
    public String encryptPassword(String password){
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setPoolSize(4);
        encryptor.setPassword(jasyptConfig.getPassword());
        encryptor.setAlgorithm("PBEWithMD5AndTripleDES");

        return encryptor.encrypt(password);
    }

    /**
     * 비밀번호 복호화
     */
    public String decryptPassword(String password){
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setPoolSize(4);
        encryptor.setPassword(jasyptConfig.getPassword());
        encryptor.setAlgorithm("PBEWithMD5AndTripleDES");

        return encryptor.decrypt(password);
    }

}