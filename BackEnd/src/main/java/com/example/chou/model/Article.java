package com.example.chou.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.util.List;

@Entity

public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private String description;

    @Min(0)
    private Integer quantite;
    private Long prix;
    private String libelle;
    private Integer quantite_commande;
    private Integer quant;
    @ManyToOne()
    @JoinColumn(name = "id_categorie")
    private Categorie categorie;
    @ManyToOne()
    @JoinColumn(name = "id_fournisseur")
    private Fournisseur fournisseur;
    @OneToMany(mappedBy = "article")

    @JsonIgnore
    private List<Detail_Article> detail_articleList;

    public Integer getQuant() {
        return quant;
    }

    public void setQuant(Integer quant) {
        this.quant = quant;
    }

    public Integer getQuantite_commande() {
        return quantite_commande;
    }

    public void setQuantite_commande(Integer quantite_commande) {
        this.quantite_commande = quantite_commande;
    }
    @JsonIgnore
    public List<Detail_Article> getDetail_articleList() {
        return detail_articleList;
    }


    public void setDetail_articleList(List<Detail_Article> detail_articleList) {
        this.detail_articleList = detail_articleList;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }


    public Long getId() {
        return id;

    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Long getPrix() {
        return prix;
    }

    public void setPrix(Long prix) {
        this.prix = prix;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
}

