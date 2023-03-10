package com.server.seb41_main_11.global.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // 반환할 http status 값, 에러 코드, 에러메세지를 관리하는 Enum 클래스
    TEST(HttpStatus.INTERNAL_SERVER_ERROR, "001", "business exception test"),

    // 인증 && 인가
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "A-001", "토큰이 만료되었습니다."),
    NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "A-002", "해당 토큰은 유효한 토큰이 아닙니다."),
    NOT_EXISTS_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "A-003", "Authorization Header가 빈값입니다."),
    NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "A-004", "인증 타입이 Bearer 타입이 아닙니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "A-005", "해당 refresh token은 존재하지 않습니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "A-006", "해당 refresh token은 만료됐습니다."),
    NOT_ACCESS_TOKEN_TYPE(HttpStatus.UNAUTHORIZED, "A-007", "해당 토큰은 ACCESS TOKEN이 아닙니다."),
    FORBIDDEN_ADMIN(HttpStatus.FORBIDDEN, "A-008", "관리자 Role이 아닙니다."),
    PASSWORD_MISMATCH(HttpStatus.UNAUTHORIZED, "A-009", "비밀번호가 일치하지 않습니다."),
    WRONG_PASSWROD(HttpStatus.UNAUTHORIZED, "A-010", "잘못된 비밀번호 입니다."),

    FORBIDDEN_COUNSELOR(HttpStatus.FORBIDDEN, "A-011", "상담사 Role이 아닙니다."),
    // 회원
    INVALID_MEMBER_TYPE(HttpStatus.BAD_REQUEST, "M-001", "잘못된 회원 타입 입니다.(memberType : KAKAO, DEFAULT)"),
    ALREADY_REGISTERED_MEMBER(HttpStatus.BAD_REQUEST, "M-002", "이미 가입된 회원 입니다."),
    MEMBER_NOT_EXISTS(HttpStatus.BAD_REQUEST, "M-003", "해당 회원은 존재하지 않습니다."),

    MEMBER_WITHDRAWN(HttpStatus.BAD_REQUEST, "M-004", "해당 회원은 탈퇴한 회원입니다"),

    //상담사
    ALREADY_REGISTERED_COUNSELOR(HttpStatus.BAD_REQUEST, "C-001", "이미 가입된 상담사 입니다."),
    COUNSELOR_NOT_EXISTS(HttpStatus.BAD_REQUEST, "C-002", "해당 상담사는 존재하지 않습니다."),

    // 프로그램
    PROGRAM_NOT_FOUND(HttpStatus.BAD_REQUEST, "P-001", "해당 프로그램이 없습니다."),

    PROGRAM_CAPACITY_EXCEEDED(HttpStatus.BAD_REQUEST, "P-002", "정원이 초과된 프로그램입니다."),

    // 결제 및 예약
    RESERVATION_NOT_FOUND(HttpStatus.BAD_REQUEST, "R-001", "결제 내역이 없습니다."),
    RESERVATION_EXISTS(HttpStatus.BAD_REQUEST, "R-002", "이미 예약한 프로그램입니다."),
    STATUS_NOT_FOUND(HttpStatus.BAD_REQUEST, "R-003", "존재하지 않는 결제상태입니다."),
    CANCEL_RESERVATION(HttpStatus.BAD_REQUEST, "R-004", "이미 취소 완료된 결제입니다."),
    NO_CANCELLATION_REQUEST(HttpStatus.BAD_REQUEST, "R-005", "결제 취소 요청이 존재하지 않습니다."),
    ALREADY_CANCELLATION_REQUESTED(HttpStatus.BAD_REQUEST, "R-006", "이미 결제 취소를 요청했습니다."),


    // 게시글
    NO_RIGHT_EDIT(HttpStatus.BAD_REQUEST, "P-001", "수정 권한이 없습니다."),

    NO_RIGHT_DELETE(HttpStatus.BAD_REQUEST, "P-002", "삭제 권한이 없습니다.")
    ;


    ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }

    private HttpStatus httpStatus;
    private String errorCode;
    private String message;

}
