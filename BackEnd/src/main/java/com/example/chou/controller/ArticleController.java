package com.example.chou.controller;


import com.example.chou.model.Article;
import com.example.chou.model.Categorie;
import com.example.chou.model.Fournisseur;
import com.example.chou.repository.ArticleRepository;
import com.example.chou.repository.CategorieRepository;
import com.example.chou.repository.FournisseurRepository;
import com.example.chou.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/article")
@CrossOrigin("*")
public class ArticleController {
    @Autowired
    FournisseurRepository fournisseurRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private CategorieRepository categorieRepository;
    @Autowired
    private StorageService storage;

    @GetMapping("/hello/{libelle}")
    public String Article(@PathVariable String libelle) {
        return "hello" + libelle;
    }

    @GetMapping("")
    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Article findbyid(@PathVariable Long id) {
        return articleRepository.findById(id).orElse(null);

    }

    @GetMapping("/lib/{id_fournisseur}")
    public List<Article> libelle(@PathVariable Long id_fournisseur) {
        return articleRepository.findArticleByid_fournisseur(id_fournisseur);
    }

    @GetMapping("/stock/{id_fournisseur}")
    public List<Article> lib(@PathVariable Long id_fournisseur) {
        return articleRepository.findArticleByfinstock(id_fournisseur);
    }

    @GetMapping("/cat/{id_categorie}")
    public List<Article> findArticleByid_categorie(@PathVariable Long id_categorie) {
        return articleRepository.findArticleByid_categorie(id_categorie);
    }

    @GetMapping("/libeldesc/{libelle}")
    public List<Article> findArticleByLibelleAndName(@RequestBody String libelle, @RequestBody String description) {
        return articleRepository.findArticleByLibelleAndName(libelle, description);

    }

    @GetMapping("/desc")
    public List<Article> findArticleByDES() {
        return articleRepository.findArticleByDES();
    }

    @GetMapping("/asc")
    public List<Article> findArticleByAsc() {
        return articleRepository.findArticleByAsc();
    }

    @GetMapping("/ascfour/{id_fournisseur}")
    public List<Article> findArticlefourByDESC(@PathVariable Long id_fournisseur) {
        return articleRepository.findArticlefourByDESC(id_fournisseur);
    }


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/img/{id_categorie}/{id_fournisseur}")
    public Article save(@RequestParam("file") MultipartFile file, Article article, @PathVariable Long id_categorie, @PathVariable Long id_fournisseur) {
        String filename = storage.CreateNameImage(file);
        storage.store(file, filename);
        article.setImage(filename);
        article.setQuant(0);
        Categorie categorie = categorieRepository.findById(id_categorie).orElse(null);
        article.setCategorie(categorie);
        Fournisseur fournisseur = fournisseurRepository.findById(id_fournisseur).orElse(null);

        article.setFournisseur(fournisseur);

        return articleRepository.save(article);

    }

    @PostMapping("/img")
    public Article save(@RequestParam("file") MultipartFile file, Article article) {
        String filename = storage.CreateNameImage(file);
        storage.store(file, filename);
        article.setImage(filename);
        return articleRepository.save(article);
    }

    @PostMapping("/")
    public Article save(@RequestBody Article article) {
        return articleRepository.save(article);
    }

    @PutMapping("/{id}")
    public Article update(@PathVariable Long id, @RequestBody Article article) {
        article.setId(id);
        Article oldArticle = articleRepository.findById(id).orElse(null);
        article.setDescription(article.getDescription() == null ? oldArticle.getDescription() : article.getDescription());
        article.setImage(oldArticle.getImage());
        article.setCategorie(oldArticle.getCategorie());
        article.setFournisseur(oldArticle.getFournisseur());
        article.setLibelle(article.getLibelle() == null ? oldArticle.getLibelle() : article.getLibelle());
        article.setPrix(article.getPrix() == null ? oldArticle.getPrix() : article.getPrix());
        article.setQuantite(article.getQuantite() == null ? oldArticle.getQuantite() : article.getQuantite());
        article.setQuant(article.getQuant() == null ? oldArticle.getQuant() : article.getQuant());
        return articleRepository.save(article);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        articleRepository.deleteById(id);
    }

    @PutMapping("/updateQuantite/{id}")
    public Article updateQuntite(@PathVariable Long id, @RequestBody Article article) {

        Article newArticle = articleRepository.findById(id).orElse(null);
        newArticle.setQuantite(newArticle.getQuantite() - article.getQuantite_commande());
        newArticle.setQuant(newArticle.getQuant() + article.getQuantite_commande());
        return articleRepository.save(newArticle);
    }
    @PutMapping("/update/{id}")
    public Article Quantite(@PathVariable Long id, @RequestBody Article article) {

        Article newArticle = articleRepository.findById(id).orElse(null);
        newArticle.setQuantite(newArticle.getQuantite() + article.getQuantite_commande());
        newArticle.setQuant(newArticle.getQuant() - article.getQuantite_commande());
        return articleRepository.save(newArticle);
    }

}
