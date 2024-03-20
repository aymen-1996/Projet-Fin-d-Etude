package com.example.chou.controller;

import com.example.chou.model.Categorie;
import com.example.chou.repository.AdminRepository;
import com.example.chou.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorie")
@CrossOrigin("*")

public class CategorieController {
    @Autowired
    private CategorieRepository categorieRepository;
    @Autowired
    private AdminRepository adminRepository;

    @GetMapping("")
    public List<Categorie> findall() {
        return categorieRepository.findAll();

    }

    @GetMapping("{id}")
    public Categorie findById(@PathVariable Long id) {
        return categorieRepository.findById(id).orElse(null);
    }

    @GetMapping("{libelle}")
    public Categorie catlib(@PathVariable String libelle) {
        return categorieRepository.findCategorieByLibelle(libelle);
    }

    @PostMapping("")
    public Categorie save(@RequestBody Categorie categorie) {

        return categorieRepository.save(categorie);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categorieRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Categorie update(@PathVariable Long id, @RequestBody Categorie categorie) {
        categorie.setId(id);
        Categorie oldCategorie = categorieRepository.findById(id).orElse(null);
        categorie.setLibelle(categorie.getLibelle() == null ? oldCategorie.getLibelle() : categorie.getLibelle());
        categorie.setDescription(categorie.getDescription() == null ? oldCategorie.getDescription() : categorie.getDescription());
        return categorieRepository.save(categorie);

    }
}
