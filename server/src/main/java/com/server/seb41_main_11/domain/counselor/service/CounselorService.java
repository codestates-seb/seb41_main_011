package com.server.seb41_main_11.domain.counselor.service;

import com.server.seb41_main_11.domain.counselor.dto.CounselorDto;
import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.counselor.repositroty.CounselorRepository;
import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.entity.Member;
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
public class CounselorService {

    private final CounselorRepository counselorRepository;

    private final TokenManager tokenManager; //for 토큰 생성

    private final JasyptConfig jasyptConfig; //for 암호화

    /**
     * 상담사 등록(회원가입)
     */
    public Counselor createCounselor(Counselor counselor) {
        validateDuplicateCounselor(counselor); //동일 이메일 확인

//        counselor.setMemberType(MemberType.DEFAULT); //상담사는 자체회원가입 밖에 없음
        counselor.setRole(Role.COUNSELOR);
        counselor.setPassword(encryptPassword(counselor.getPassword()));

        return counselorRepository.save(counselor);
    }

    /**
     * 상담사 로그인
     */
    public CounselorDto.LoginResponse login(Counselor counselor) {
        JwtTokenDto jwtTokenDto;
        Optional<Counselor> optionalCounselor = findCounslerByEmail(counselor.getEmail());

        if (optionalCounselor.isEmpty()) {
            throw new EntityNotFoundException(ErrorCode.COUNSELOR_NOT_EXISTS);
        }

        Counselor findCounselor = optionalCounselor.get();

        if (!decryptPassword(findCounselor.getPassword()).equals(counselor.getPassword())) {
            throw new AuthenticationException(ErrorCode.WRONG_PASSWROD);
        }

        jwtTokenDto = tokenManager.createJwtTokenDto(findCounselor.getCounselorId(), findCounselor.getRole());

        findCounselor.updateRefreshToken(jwtTokenDto); //토큰값 설정
        counselorRepository.save(findCounselor); //db에 토큰 업데이트

        return CounselorDto.LoginResponse.of(jwtTokenDto, findCounselor.getRole());
    }

    /**
     * 상담사 목록 조회
     */
    @Transactional(readOnly = true)
    public Page<Counselor> findMembers(int page, int size) {
        Page<Counselor> findAllCounselor = counselorRepository.findAll(
                PageRequest.of(page,size, Sort.by("counselorId").descending())
        );
        return findAllCounselor;
    }

    /**
     * 상담사 수정
     */
    public Counselor updateCounselor(Counselor counselor) {
        Counselor findCounselor = findVerifiedCounselorByCounselorId(counselor.getCounselorId());

        String password = encryptPassword(counselor.getPassword());
        findCounselor.setPassword(password);

        return counselorRepository.save(findCounselor);
    }

    /**
     * 상담사 삭제
     */
    public void deleteCounselor(Long counselorId) {
        counselorRepository.deleteById(counselorId);
    }

    /**
     * 로그인한 상담사 정보 조회
     */
    @Transactional(readOnly = true)
    public Counselor getLoginCounselor(HttpServletRequest httpServletRequest) {
        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        String accessToken = authorizationHeader.split(" ")[1]; // Bearer askdhqwdkjwqbdkjwqbdkjqwbdkjwqb

        Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
        Long counselorId = Long.valueOf((Integer) tokenClaims.get("memberId"));
        return findVerifiedCounselorByCounselorId(counselorId);
    }

    /**
     * 상담사 중복 확인
     */
    private void validateDuplicateCounselor(Counselor counselor) {
        Optional<Counselor> optionalCounselor = findCounslerByEmail(counselor.getEmail());
        if(optionalCounselor.isPresent()){
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_COUNSELOR);
        }
    }

    /**
     * 상담사 존재 확인
     */
    @Transactional(readOnly = true)
    public Counselor findVerifiedCounselorByCounselorId(Long counselorId) {
        return counselorRepository.findById(counselorId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.COUNSELOR_NOT_EXISTS));
    }

    private Optional<Counselor> findCounslerByEmail(String email) {
        return counselorRepository.findByEmail(email);
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


    public Counselor findCounselorByRefreshToken(String refreshToken) {
        Counselor counselor = counselorRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));
        LocalDateTime tokenExpirationTime = counselor.getTokenExpirationTime();
        if(tokenExpirationTime.isBefore(LocalDateTime.now())) {
            throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_EXPIRED); //refresh 토큰이 만료됐을 경우
        }
        return counselor;
    }
}
