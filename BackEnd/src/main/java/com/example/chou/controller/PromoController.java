package com.example.chou.controller;

import com.example.chou.model.Promo;
import com.example.chou.repository.PromoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PromoController {
    @Autowired
    private PromoRepository promoRepository;

    @GetMapping("/promo")
    public List<Promo> findall() {
        return promoRepository.findAll();
    }

    @GetMapping("/promo/{id}")
    public Promo findById(@PathVariable Long id_promo) {
        return promoRepository.findById(id_promo).orElse(null);
    }

    @PostMapping("/promo")
    public Promo save(@RequestBody Promo promo) {
        return promoRepository.save(promo);
    }

    @DeleteMapping("/promo/{id}")
    public void delete(@PathVariable Long id) {
        promoRepository.deleteById(id);
    }

    @PutMapping("/promo/{id}")
    public Promo update(@PathVariable long id, @RequestBody Promo promo) {
        promo.setId(id);
        Promo oldPromo = promoRepository.findById(id).orElse(null);
        promo.setPourcentage(promo.getPourcentage() == null && oldPromo != null ? oldPromo.getPourcentage() : promo.getPourcentage());
        return promoRepository.save(promo);
    }
}
