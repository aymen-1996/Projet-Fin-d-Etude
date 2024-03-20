package com.example.chou.repository;

import com.example.chou.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("SELECT a FROM Article a WHERE a.fournisseur.id = ?1")
    List<Article> findArticleByid_fournisseur(Long fournisseur);

    @Query("SELECT a FROM Article a WHERE a.fournisseur.id = ?1 ORDER BY a.quant DESC ")
    List<Article> findArticlefourByDESC(Long fournisseur);

    @Query("SELECT a FROM Article a WHERE a.fournisseur.id = ?1 and a.quantite<5")
    List<Article> findArticleByfinstock(Long fournisseur);

    @Query("SELECT a FROM Article a WHERE a.categorie.id = ?1")
    List<Article> findArticleByid_categorie(Long categorie);

    @Query("SELECT arti FROM Article arti WHERE arti.libelle = ?1 and arti.description = ?2")
    List<Article> findArticleByLibelleAndName(String libelle, String description);

    @Query(nativeQuery = true, value = "SELECT * FROM Article s  ORDER BY s.id DESC LIMIT 8")
    List<Article> findArticleByDES();

    @Query(nativeQuery = true, value = "SELECT * FROM Article s  ORDER BY s.quant DESC LIMIT 3")
    List<Article> findArticleByAsc();

    //@Query(nativeQuery = true, value = "SELECT * FROM Article a WHERE a.fournisseur.id=?1")
  /*@Query(nativeQuery = true,value = "SELECT * FROM Article a WHERE a.fournisseur.id=?1")
  List<Article> findArticlefourByDESC2( Long fournisseur);*/
}
