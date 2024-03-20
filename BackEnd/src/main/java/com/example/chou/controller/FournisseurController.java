package com.example.chou.controller;

import com.example.chou.Security.UserService;
import com.example.chou.enums.UserRole;
import com.example.chou.model.Fournisseur;
import com.example.chou.repository.FournisseurRepository;
import com.example.chou.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/fournisseur")
@CrossOrigin("*")
public class FournisseurController {
    @Autowired
    private FournisseurRepository fournisseurRepository;
    @Autowired
    private StorageService storage;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserService userService;


    @GetMapping("")
    public List<Fournisseur> findall() {
        return fournisseurRepository.findAll();
    }


    @GetMapping("/{id}")
    public Fournisseur findById(@PathVariable Long id) {
        return fournisseurRepository.findById(id).orElse(null);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/img")
    public Fournisseur save(@RequestParam("file") MultipartFile file, Fournisseur fournisseur) {


        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(fournisseur.getMail());

        msg.setSubject("Compte inactive");
        msg.setText("Bonjour " + fournisseur.getNom() + fournisseur.getPrenom() + "\n ton compte est inactive ,en cas d'activation,nous vous enverrons un mail.\n Merci! ");

        javaMailSender.send(msg);

        fournisseur.setRole(UserRole.FOURNISSEUR.getRole());
        String filename = storage.CreateNameImage(file);
        storage.store(file, filename);
        fournisseur.setImage(filename);
        fournisseur.setCreated(new Date());
        fournisseur.setEnabel(false);
        fournisseur.setPassword(userService.encodePassword(fournisseur.getPassword()));
        return fournisseurRepository.save(fournisseur);
    }

    @GetMapping("/mail")
    public void mail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("chouaibiaymen03@gmail.com");
        msg.setSubject("Testing from Spring Boot");
        msg.setText("Hello World \n Spring Boot Email");
        javaMailSender.send(msg);
        System.out.println("email done");
    }

    @PostMapping("/auth")
    public Fournisseur mailpass(@RequestBody Fournisseur fournisseur) {
        return fournisseurRepository.findFournisseurByMailAAndPasswordAAndAndEnabel(fournisseur.getMail(), fournisseur.getPassword(), fournisseur.getEnabel());
    }

    @GetMapping("/enabelf")
    public List<Fournisseur> findfournisseurfalse() {

        return fournisseurRepository.findFournisseurByEnabel(false);

    }

    @GetMapping("/enabelt")
    public List<Fournisseur> findfournisseuretrue() {
        return fournisseurRepository.findFournisseurByEnabel(true);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        fournisseurRepository.deleteById(id);
    }

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
        fournisseur.setCreated(fournisseur.getCreated() == null ? oldFournisseur.getCreated() : fournisseur.getCreated());
        fournisseur.setRole(fournisseur.getRole() == null ? oldFournisseur.getRole() : fournisseur.getRole());

        return fournisseurRepository.save(fournisseur);
    }

}
