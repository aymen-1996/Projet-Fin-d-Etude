package com.example.chou.controller;

import com.example.chou.model.Admin;
import com.example.chou.repository.AdminRepository;
import com.example.chou.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private StorageService storage;

    @GetMapping("/admin")
    public List<Admin> findall() {
        return adminRepository.findAll();
    }

    @GetMapping("/admin/{id}")
    public Admin findById(@PathVariable Long id_admin) {
        return adminRepository.findById(id_admin).orElse(null);
    }

    @PostMapping("/admin")
    public Admin save(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }

    @DeleteMapping("/admin")
    public void delete(@PathVariable Long id) {
        adminRepository.deleteById(id);
    }

    @PutMapping("/admin/{id}")
    public Admin update(@PathVariable Long id, @RequestBody Admin admin) {
        admin.setId(id);
        return adminRepository.save(admin);
    }

    @PostMapping("/admin/img")
    public Admin save(@RequestParam("file") MultipartFile file, Admin admin) {
        admin.setRole("admin");
        String filename = storage.CreateNameImage(file);
        storage.store(file, filename);
        admin.setImage(filename);
        return adminRepository.save(admin);
    }
}
