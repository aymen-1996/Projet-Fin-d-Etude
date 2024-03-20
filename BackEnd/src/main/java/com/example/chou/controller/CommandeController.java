package com.example.chou.controller;

import com.example.chou.model.Client;
import com.example.chou.model.Commande;
import com.example.chou.model.Detail_Article;
import com.example.chou.repository.ClientRepository;
import com.example.chou.repository.CommandeRepository;
import com.example.chou.repository.DetailArticleRepository;
import com.example.chou.repository.PanierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commande")
@CrossOrigin("*")

public class CommandeController {
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private PanierRepository panierRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private DetailArticleRepository detail_articleRepository;

    @GetMapping("")
    public List<Commande> findCommandeByDESC() {
        return commandeRepository.findCommandeByDESC();
    }

    @GetMapping("/{id}")
    public Commande findById(@PathVariable Long id_commande) {
        return commandeRepository.findById(id_commande).orElse(null);
    }

    @GetMapping("/livraison/{id_client}")
    public List<Commande> findCommandeByid_client(@PathVariable Long id_client) {
        return commandeRepository.findCommandeByid_client(id_client);
    }

    @PostMapping("/stat/commande")
    public List<Commande> findCommandedate(@RequestBody Commande commande) {
        System.out.println(commande.getDate());
        return commandeRepository.findCommandeByDate(commande.getDate());
    }

    @PostMapping("/stat/commandeInf")
    public List<Detail_Article> findAllWithCreationDateTime(@RequestBody Commande commande) {
        System.out.println(commande.getDate());
        return detail_articleRepository.findAllWithCreationDateTimeBefore(commande.getDateEnd(), commande.getDate());
    }

    @PostMapping("/{id_client}")
    public Commande save(@RequestBody Commande commande, @PathVariable long id_client) {

        Client client = clientRepository.findById(id_client).orElse(null);
        commande.setClient(client);
       /* SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(commande.getClient().getMail());

        msg.setSubject("Commande passée avec succé");
        msg.setText("Bonjour " + commande.getClient().getNom() + commande.getClient().getPrenom() + "\n ta commande est passé avec succés  ,elle sera livré en 48h max\n Nous vous contacterons par votre telephone "  +  commande.getClient().getNumtel() + " pour recevoir votre demande \n prix Total de votre commande est:  " + commande.getPrix_total() +"dt");

        javaMailSender.send(msg);

        System.out.println("email done");*/
       commande.setEtat("encours");
        return commandeRepository.save(commande);

    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        commandeRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Commande update(@PathVariable long id, @RequestBody Commande commande) {
        commande.setId(id);
        Commande oldCommande = commandeRepository.findById(id).orElse(null);
        commande.setEtat(commande.getEtat() == null ? oldCommande.getEtat() : commande.getEtat());
        commande.setDate(commande.getDate() == null ? oldCommande.getDate() : commande.getDate());
        commande.setPrix_total(commande.getPrix_total() == null ? oldCommande.getPrix_total() : commande.getPrix_total());
        commande.setQuantite_total(commande.getQuantite_total() == null ? oldCommande.getQuantite_total() : commande.getQuantite_total());
        commande.setClient(commande.getClient() == null ? oldCommande.getClient() : commande.getClient());





        return commandeRepository.save(commande);
    }

}
