package com.server.seb41_main_11.domain.post.repository;

import com.server.seb41_main_11.domain.post.entity.Post;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Modifying
    @Query("update Post p set p.views = p.views + 1 where p.postId = :postId")
    void updateViews(@Param("postId") Long postId);

    @Query(value = "select p FROM Post p WHERE p.postId = :postId")
    Optional<Post> findById(@Param("postId") Long postId);
}
