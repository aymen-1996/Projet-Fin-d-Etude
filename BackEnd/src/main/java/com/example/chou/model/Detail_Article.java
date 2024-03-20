package com.example.chou.model;

import javax.persistence.*;

@Entity
public class Detail_Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantite_commande;
    @ManyToOne()
    @JoinColumn(name = "id_article")

    private Article article;
    @ManyToOne()
    @JoinColumn(name = "id_commande")
    private Commande commande;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getQuantite_commande() {
        return quantite_commande;
    }

    public void setQuantite_commande(Long quantite_commande) {
        this.quantite_commande = quantite_commande;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }
}
