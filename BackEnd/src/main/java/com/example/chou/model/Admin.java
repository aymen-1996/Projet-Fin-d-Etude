package com.example.chou.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("admin")
public class Admin extends User {
    public Admin(){}
    public Admin(String mail, String password, String nom, String role) {
       super(mail,password,nom,role);
    }


}
