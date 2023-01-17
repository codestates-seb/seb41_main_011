package com.server.seb41_main_11.domain.program.repository;

import com.server.seb41_main_11.domain.program.entity.Program;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {

    List<Program> findAllByCounselor(long counselorId);
}
