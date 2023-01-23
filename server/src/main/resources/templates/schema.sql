DROP TABLE IF EXISTS member;

CREATE TABLE member (
    member_id bigint AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200),
    memberName VARCHAR(20) NOT NULL,
    nick_name VARCHAR(10),
    birth VARCHAR(10),
    profile VARCHAR(200),
    role ENUM(10) NOT NULL,
    member_type ENUM(10) NOT NULL,
    refresh_token VARCHAR(250),
    token_expiration_time DATATIME
);