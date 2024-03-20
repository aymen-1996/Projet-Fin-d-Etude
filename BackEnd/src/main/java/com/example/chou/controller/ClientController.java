package com.example.chou.controller;

import com.example.chou.Security.UserService;
import com.example.chou.model.Client;
import com.example.chou.model.Panier;
import com.example.chou.repository.ClientRepository;
import com.example.chou.repository.PanierRepository;
import com.example.chou.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PanierRepository panierRepository;
    @Autowired
    private StorageService storage;
    @Autowired
    private UserService userService;

    @GetMapping("/client")
    public List<Client> findall() {
        return clientRepository.findAll();

    }

    @GetMapping("/client/{id}")
    public Client findById(@PathVariable Long id_client) {
        return clientRepository.findById(id_client).orElse(null);
    }

    @GetMapping("/client//files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/client/img")
    public Client save(@RequestParam("file") MultipartFile file, Client client) {
        client.setRole("client");
        String filename = storage.CreateNameImage(file);
        storage.store(file, filename);
        client.setImage(filename);
        client.setCreated(new Date());
        client.setPassword(userService.encodePassword(client.getPassword()));
        return clientRepository.save(client);
    }

    @PostMapping("/client/auth")
    public Client mailpass(@RequestBody Client client) {
        return clientRepository.findClientByMailAAndPassword(client.getMail(), client.getPassword());
    }

    @PostMapping("/client/{id_panier}")
    public Client save(@RequestBody Client client, @PathVariable Long id_panier) {
        Panier panier = panierRepository.findById(id_panier).orElse(null);
        client.setPanier(panier);
        return clientRepository.save(client);
    }

    @DeleteMapping("/client/{id}")
    public void delete(@PathVariable Long id) {
        clientRepository.deleteById(id);
    }

    @PutMapping("/client/{id}")
    public Client update(@PathVariable Long id, @RequestBody Client client) {
        client.setId(id);
        Client oldClient = clientRepository.findById(id).orElse(null);
        client.setAdresse(client.getAdresse() == null ? oldClient.getAdresse() : client.getAdresse());
        return clientRepository.save(client);
    }
}
