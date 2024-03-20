package com.example.chou.repository;

import com.example.chou.model.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
    @Query("SELECT f FROM Fournisseur f WHERE f.mail=?1 and f.password=?2 and f.enabel=?3")
    Fournisseur findFournisseurByMailAAndPasswordAAndAndEnabel(String mail, String password, Boolean enabel);

    @Query("SELECT u FROM Fournisseur u WHERE u.enabel=?1 ")
    List<Fournisseur> findFournisseurByEnabel(boolean enabel);
}


