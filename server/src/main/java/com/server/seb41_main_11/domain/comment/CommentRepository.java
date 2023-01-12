package com.server.seb41_main_11.domain.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "SELECT c FROM Comment c WHERE c.commentId =: commentId")
    Optional<Comment> findById(long commentId);
}
