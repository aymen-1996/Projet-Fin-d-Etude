package com.example.chou.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;

    private Date dateEnd;
    private Integer quantite_total;
    private Float prix_total;
    private String etat;
    @ManyToOne()
    @JoinColumn(name = "id_client")
    private Client client;
    @OneToMany(mappedBy = "commande")

    private List<Detail_Article> detail_articleList;

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite_total() {
        return quantite_total;
    }

    public void setQuantite_total(Integer quantite_total) {
        this.quantite_total = quantite_total;
    }

    public Float getPrix_total() {
        return prix_total;
    }

    public void setPrix_total(Float prix_total) {
        this.prix_total = prix_total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Detail_Article> getDetail_articleList() {
        return detail_articleList;
    }
    @JsonIgnore
    public void setDetail_articleList(List<Detail_Article> detail_articleList) {
        this.detail_articleList = detail_articleList;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }
}
