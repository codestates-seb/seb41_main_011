package com.server.seb41_main_11.domain.post;

import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Modifying
    @Query("update Post p set p.views = p.views + 1 where p.postId = :postId")
    int updateViews(@Param("postId") Long postId);
}
