package com.resume.backend.repository;

import com.resume.backend.model.ResumeHistory;
import com.resume.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeHistoryRepository extends JpaRepository<ResumeHistory, Long> {
    List<ResumeHistory> findByUserOrderByCreatedAtDesc(User user);
    Optional<ResumeHistory> findByIdAndUser(Long id, User user);
}
