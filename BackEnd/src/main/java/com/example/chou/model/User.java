package com.example.chou.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String nom;
    private String image;
    private String prenom;
    @JsonIgnore
    private String password;
    @Column(unique = true)
    private String mail;
    private Integer numtel;
    private String role;
    private Boolean enabel = true;
    private Date created;
    public User() {
        super();
    }
    public User(String mail, String password, String nom, String role) {
        this.nom = nom;
        this.password = password;
        this.mail = mail;
        this.role = role;
    }

    public Boolean getEnabel() {
        return enabel;
    }

    public void setEnabel(Boolean enabel) {
        this.enabel = enabel;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Integer getNumtel() {
        return numtel;
    }

    public void setNumtel(Integer numtel) {
        this.numtel = numtel;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
}

