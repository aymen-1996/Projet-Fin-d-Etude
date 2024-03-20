package com.example.chou.repository;

import com.example.chou.model.Aff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AffRepository extends JpaRepository<Aff, Long> {
}
