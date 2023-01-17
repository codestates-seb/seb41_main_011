package com.server.seb41_main_11.domain.pay.repository;

import com.server.seb41_main_11.domain.pay.entity.Pay;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PayRepository extends JpaRepository<Pay, Long> {
    @Query(value = "select * from pay where member_id = :memberId", nativeQuery = true)
    List<Pay> findAllByMember(long memberId);
}
