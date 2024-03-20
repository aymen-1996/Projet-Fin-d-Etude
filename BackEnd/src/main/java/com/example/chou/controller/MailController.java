package com.example.chou.controller;

import com.example.chou.model.Fournisseur;
import com.example.chou.repository.FournisseurRepository;
import com.example.chou.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin("*")

public class MailController {
    @Autowired
    private FournisseurRepository fournisseurRepository;
    @Autowired
    private StorageService storage;
    @Autowired
    private JavaMailSender javaMailSender;

    @PutMapping("/{id}")
    public Fournisseur update(@PathVariable long id, @RequestBody Fournisseur fournisseur) {
        fournisseur.setId(id);
        Fournisseur oldFournisseur = fournisseurRepository.findById(id).orElse(null);
        fournisseur.setCompagnie(fournisseur.getCompagnie() == null ? oldFournisseur.getCompagnie() : fournisseur.getCompagnie());
        fournisseur.setImage(oldFournisseur.getImage());
        fournisseur.setMail(fournisseur.getMail() == null ? oldFournisseur.getMail() : fournisseur.getMail());
        fournisseur.setPassword(fournisseur.getPassword() == null ? oldFournisseur.getPassword() : fournisseur.getPassword());
        fournisseur.setNom(fournisseur.getNom() == null ? oldFournisseur.getNom() : fournisseur.getNom());
        fournisseur.setPrenom(fournisseur.getPrenom() == null ? oldFournisseur.getPrenom() : fournisseur.getPrenom());
        fournisseur.setNumtel(fournisseur.getNumtel() == null ? oldFournisseur.getNumtel() : fournisseur.getNumtel());
        fournisseur.setEnabel(fournisseur.getEnabel() == null ? oldFournisseur.getEnabel() : fournisseur.getEnabel());
        fournisseur.setRole(fournisseur.getRole() == null ? oldFournisseur.getRole() : fournisseur.getRole());
        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setTo(fournisseur.getMail());

        msg.setSubject("Acceptation compte");
        msg.setText("Bonjour " + fournisseur.getNom() + fournisseur.getPrenom() + " ton compte maintenant est valide , tu peux connecter au plateforme. \n Bienvenu au plateforme vente audio-visuel \uD83D\uDE0A\uD83D\uDE0A\n");

        javaMailSender.send(msg);

        System.out.println("email done");

        return fournisseurRepository.save(fournisseur);
    }
}
