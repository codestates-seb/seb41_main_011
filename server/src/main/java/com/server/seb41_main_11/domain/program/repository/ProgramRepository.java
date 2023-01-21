package com.server.seb41_main_11.domain.program.repository;

import com.server.seb41_main_11.domain.program.entity.Program;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProgramRepository extends JpaRepository<Program, Long> {

    @Query(value = "select * from program where counselor_id = :counselorId", nativeQuery = true)
    Page<Program> findAllByCounselor(long counselorId, Pageable pageable);

    Page<Program> findAllBySymptomTypes(String symptomTypes, Pageable pageable);

    Optional<Program> findByProgramIdAndCounselorCounselorId(long programId, long counselorId);
}
