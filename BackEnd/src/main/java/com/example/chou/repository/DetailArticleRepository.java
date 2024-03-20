package com.example.chou.repository;

import com.example.chou.model.Detail_Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DetailArticleRepository extends JpaRepository<Detail_Article, Long> {
    @Query("SELECT a FROM Detail_Article a WHERE a.commande.id = ?1")
    List<Detail_Article> findArticleByid_commande(Long commande);

    @Query("SELECT c FROM Detail_Article c WHERE c.article.fournisseur.id = ?1")
    List<Detail_Article> findArticleByarticlefour(Long fournisseur);

    @Query("select c from Detail_Article c where c.commande.date <= :endDate and c.commande.date > :startDate")
    List<Detail_Article> findAllWithCreationDateTimeBefore(
            @Param("endDate") Date endDate,
            @Param("startDate") Date startDate);
}
