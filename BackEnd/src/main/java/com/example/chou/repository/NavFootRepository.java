package com.example.chou.repository;

import com.example.chou.model.navfoot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NavFootRepository extends JpaRepository<navfoot, Long> {
}
