package com.server.seb41_main_11.domain.member.constant;

public enum Role {

    USER, ADMIN, COUNSELOR;

    public static Role from(String role) {
        return Role.valueOf(role);
    }

}
