package com.server.seb41_main_11;

import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;

/**
 * yml 암호화 진행
 */
public class JasyptTest {

    @Value("${jasypt.password}")
    private String password;
    @Test
    public void jasyptTest() {
//        String password = "sakncksjallkasdkl#$@^#*asdsiajodias2737"; //vmOptions에 넣어둔 값으로 설정
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setPoolSize(4);
        encryptor.setPassword(password);
        encryptor.setAlgorithm("PBEWithMD5AndTripleDES");
        String content = "wjdehdrbtlsrjsdndleoruagkgjswlsrlachdldbdkstjchlrhdhfgksgoehekemfakanflwkfgktlrlfqkfkrpTtmqslek";    // 암호화 할 내용
        String encryptedContent = encryptor.encrypt(content); // 암호화
        String decryptedContent = encryptor.decrypt(encryptedContent); // 복호화
        System.out.println("Enc : " + encryptedContent + ", Dec: " + decryptedContent);
    }

}
