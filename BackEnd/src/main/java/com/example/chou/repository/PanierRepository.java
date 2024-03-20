package com.example.chou.repository;

import com.example.chou.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PanierRepository extends JpaRepository<Panier, Long> {
}
