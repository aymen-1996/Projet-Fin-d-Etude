package com.example.chou.repository;

import com.example.chou.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    @Query("SELECT a FROM Commande a WHERE a.client.id = ?1 ORDER BY a DESC")
    List<Commande> findCommandeByid_client(Long client);

    @Query("SELECT a FROM Commande a ORDER BY a DESC")
    List<Commande> findCommandeByDESC();

    @Query("SELECT c FROM Commande c WHERE c.date =?1 ")
    List<Commande> findCommandeByDate(Date date);

    @Query("SELECT v FROM Commande v WHERE v.prix_total =?1 ")
    List<Commande> findCommandeprixtotal(Float prix_total);


    @Query("select c from Commande c where c.date <= :endDate and c.date > :startDate")
    List<Commande> findAllWithCreationDateTimeBefore(
            @Param("endDate") Date endDate,
            @Param("startDate") Date startDate);

}
