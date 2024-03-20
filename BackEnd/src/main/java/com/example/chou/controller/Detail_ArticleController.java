package com.example.chou.controller;

import com.example.chou.model.Article;
import com.example.chou.model.Commande;
import com.example.chou.model.Detail_Article;
import com.example.chou.repository.ArticleRepository;
import com.example.chou.repository.CommandeRepository;
import com.example.chou.repository.DetailArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/detail_article")
@RestController
@CrossOrigin("*")
public class Detail_ArticleController {
    @Autowired
    private DetailArticleRepository detail_articleRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/{id_article}/{id_commande}")
    public Detail_Article save(@RequestBody Detail_Article detail_article, @PathVariable Long id_article, @PathVariable Long id_commande) {
        Article article = articleRepository.findById(id_article).orElse(null);
        detail_article.setArticle(article);
        Commande commande = commandeRepository.findById(id_commande).orElse(null);
        detail_article.setCommande(commande);
        /*SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(detail_article.getArticle().getFournisseur().getMail());

        msg.setSubject("Vous avez des produits a commandé");
        msg.setText("Bonjour " + detail_article.getArticle().getFournisseur().getNom() + detail_article.getArticle().getFournisseur().getPrenom() + "\n tu as un livraison pour "+commande.getClient().getNom() +"\n adresse de livraison est: " +commande.getClient().getAdresse() +"\n les proquis qui a commandé " + detail_article.getQuantite_commande()+" x "+ detail_article.getArticle().getLibelle());

        javaMailSender.send(msg);

        System.out.println("email done");*/
        return detail_articleRepository.save(detail_article);
    }

    @GetMapping("/detail/{id}")
    public Detail_Article findById(@PathVariable Long id) {
        return detail_articleRepository.findById(id).orElse(null);
    }

    @GetMapping("/{id_commande}")
    public List<Detail_Article> findArticleByid_commande(@PathVariable Long id_commande) {
        return detail_articleRepository.findArticleByid_commande(id_commande);
    }
    @GetMapping("/detailcmd/{id_fournisseur}")
    public List<Detail_Article> libelle(@PathVariable Long id_fournisseur) {
        return detail_articleRepository.findArticleByarticlefour(id_fournisseur);
    }

    @DeleteMapping("/detail_commande/{id}")
    public void delete(@PathVariable Long id) {
        detail_articleRepository.deleteById(id);
    }

}
