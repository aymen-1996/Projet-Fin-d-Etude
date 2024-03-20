package com.example.chou.repository;

import com.example.chou.model.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    @Query("SELECT cat FROM Categorie cat where cat.libelle=?1")
    Categorie findCategorieByLibelle(String Libelle);
}
