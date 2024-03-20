package com.example.chou.controller;

import com.example.chou.model.Aff;
import com.example.chou.repository.AffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AffController {
    @Autowired
    private AffRepository affRepository;

    @GetMapping("/aff/{id}")
    public Aff getall(@PathVariable Long id) {
        return affRepository.findById(id).get();
    }

    @GetMapping("/aff")
    public List<Aff> getall() {
        return affRepository.findAll();
    }

    @PutMapping("/aff/{id}")
    public Aff update(@PathVariable Long id, @RequestBody Aff aff) {
        aff.setId(id);
        Aff oldAff = affRepository.findById(id).orElse(null);
        aff.setPublication(aff.getPublication() == null ? oldAff.getPublication() : aff.getPublication());

        return affRepository.save(aff);
    }
}
