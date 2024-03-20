package com.example.chou.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@DiscriminatorValue("client")
public class Client extends User {

    private String adresse;
    @ManyToOne()
    @JoinColumn(name = "id_panier")
    private Panier panier;
    @OneToMany(mappedBy = "client")
    private List<Commande> commandeList;

    @JsonIgnore
    public List<Commande> getCommandeList() {
        return commandeList;
    }

    public void setCommandeList(List<Commande> commandeList) {
        this.commandeList = commandeList;
    }

    public Panier getPanier() {
        return panier;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
}
