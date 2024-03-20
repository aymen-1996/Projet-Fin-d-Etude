package com.example.chou.controller;

import com.example.chou.model.User;
import com.example.chou.repository.UserRepository;
import com.example.chou.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/use")
@CrossOrigin("*")

public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StorageService storage;

    @GetMapping("")
    public List<User> findall() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User findByid(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/u/{mail}")
    public User mail(@PathVariable String mail) {
        return userRepository.findUserByMail(mail);
    }

    @PostMapping("/auth")
    public User mailpass(@RequestBody User user) {
        return userRepository.findUserByMailAAndPassword(user.getMail(), user.getPassword());
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/img")
    public User save(@RequestParam("file") MultipartFile file, User user) {
        String filename = storage.CreateNameImage(file);
        storage.store(file, filename);
        user.setImage(filename);
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        User oldUser = userRepository.findById(id).orElse(null);
        user.setNom(user.getNom() == null ? oldUser.getNom() : user.getNom());
        user.setPrenom(user.getPrenom() == null ? oldUser.getPrenom() : user.getPrenom());
        user.setPassword(user.getPassword() == null ? oldUser.getPassword() : user.getPassword());
        user.setMail(user.getMail() == null ? oldUser.getMail() : user.getMail());
        user.setNumtel(user.getNumtel() == null ? oldUser.getNumtel() : user.getNumtel());
        user.setCreated(user.getCreated() == null ? oldUser.getCreated() : user.getCreated());
        user.setImage(oldUser.getImage());
        return userRepository.save(user);
    }
}
