package com.server.seb41_main_11.domain.pay.repository;

import com.server.seb41_main_11.domain.pay.entity.Pay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PayRepository extends JpaRepository<Pay, Long> {
    @Query(value = "select * from pay where member_id = :memberId", nativeQuery = true)
    Page<Pay> findAllByMember(long memberId, Pageable pageable);
}
