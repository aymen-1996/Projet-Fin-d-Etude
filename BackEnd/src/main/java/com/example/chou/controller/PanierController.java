package com.example.chou.controller;

import com.example.chou.model.Panier;
import com.example.chou.repository.PanierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class PanierController {
    @Autowired
    private PanierRepository panierRepository;

    @GetMapping("/panier")
    public List<Panier> findall() {
        return panierRepository.findAll();
    }

    @GetMapping("/panier/{id}")
    public Panier findById(@PathVariable Long id_panier) {
        return panierRepository.findById(id_panier).orElse(null);
    }

    @PostMapping("/panier")
    public Panier save(@RequestBody Panier panier) {
        return panierRepository.save(panier);
    }

    @DeleteMapping("/panier/{id}")
    public void delete(@PathVariable Long id) {
        panierRepository.deleteById(id);
    }

    @PutMapping("/panier/{id}")
    public Panier update(@PathVariable long id, @RequestBody Panier panier) {
        panier.setId(id);
        Panier oldPanier = panierRepository.findById(id).orElse(null);
        panier.setQuntité(panier.getQuntité() == null ? oldPanier.getQuntité() : panier.getQuntité());
        panier.setPrixtotal(panier.getPrixtotal() == null ? oldPanier.getPrixtotal() : panier.getPrixtotal());
        return panierRepository.save(panier);
    }
}

