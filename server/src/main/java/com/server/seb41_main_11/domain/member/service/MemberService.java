package com.server.seb41_main_11.domain.member.service;

import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
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
import lombok.RequiredArgsConstructor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
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
     * 회원 로그인
     */
    public MemberDto.LoginResponse login(Member member) {
        JwtTokenDto jwtTokenDto;
        Optional<Member> optioanlMember = findMemberByEmail(member.getEmail()); //이메일로 회원 검색

        if(optioanlMember.isEmpty()) {
            throw new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS); //존재 안하면 예외 처리
        }

        Member findMember = optioanlMember.get();

        if(!decryptPassword(findMember.getPassword()).equals(member.getPassword())){
            throw new AuthenticationException(ErrorCode.WRONG_PASSWROD); //비밀번호 일치 하지 않으면 예외처리
        }

        jwtTokenDto = tokenManager.createJwtTokenDto(findMember.getMemberId(), findMember.getRole()); //토큰 생성
        findMember.updateRefreshToken(jwtTokenDto); //db에 리프레쉬 토큰 업데이트

        return MemberDto.LoginResponse.of(jwtTokenDto);
    }

    /**
     * 회원 중복 확인
     */
    private void validateDuplicateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if(optionalMember.isPresent()) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
            //동일 이메일 있는 경우 에러 처리
        }
    }

    /**
     * 회원 존재 확인
     */
    public Member findMemberByMemberId(Long memberId) {
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