package com.server.seb41_main_11.domain.notice;

import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Modifying
    @Query("update Notice n set n.views = n.views + 1 where n.noticeId = :noticeId")
    void updateViews(@Param("noticeId") Long noticeId);

    @Query(value = "select n FROM Notice n WHERE n.noticeId = :noticeId")
    Optional<Notice> findById(long noticeId);
}
