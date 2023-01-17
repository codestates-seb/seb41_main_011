package com.server.seb41_main_11.domain.counselor.service;

import com.server.seb41_main_11.domain.counselor.entity.Counselor;
import com.server.seb41_main_11.domain.counselor.repositroty.CounselorRepository;
import com.server.seb41_main_11.domain.member.constant.MemberType;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.global.config.JasyptConfig;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import lombok.RequiredArgsConstructor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CounselorService {

    private final CounselorRepository counselorRepository;

    private final TokenManager tokenManager; //for 토큰 생성

    private final JasyptConfig jasyptConfig; //for 암호화

    /**
     * 상담사 등록
     */
    public Counselor createCounselor(Counselor counselor) {
        validateDuplicateCounselor(counselor); //동일 이메일 확인

        counselor.setMemberType(MemberType.DEFAULT); //상담사는 자체회원가입 밖에 없음
        counselor.setRole(Role.COUNSELOR);
        counselor.setPassword(encryptPassword(counselor.getPassword()));

        return counselorRepository.save(counselor);
    }

    private void validateDuplicateCounselor(Counselor counselor) {
        Optional<Counselor> optionalCounselor = counselorRepository.findByEmail(counselor.getEmail());
        if(optionalCounselor.isPresent()){
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_COUNSELOR);
        }
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
