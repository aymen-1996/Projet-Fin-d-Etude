package com.example.chou.controller;

import com.example.chou.model.navfoot;
import com.example.chou.repository.NavFootRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class NavFootController {
    @Autowired
    private NavFootRepository navFootRepository;

    @GetMapping("/navfoot/{id}")
    public navfoot getall(@PathVariable Long id) {
        return navFootRepository.findById(id).get();
    }

    @PutMapping("/navfoot/{id}")
    public navfoot update(@PathVariable Long id, @RequestBody navfoot navfoot) {
        navfoot.setId(id);
        navfoot oldAff = navFootRepository.findById(id).orElse(null);
        navfoot.setNumtel(navfoot.getNumtel() == null ? oldAff.getNumtel() : navfoot.getNumtel());
        navfoot.setSemainedebut(navfoot.getSemainedebut() == null ? oldAff.getSemainedebut() : navfoot.getSemainedebut());
        navfoot.setSemainefin(navfoot.getSemainefin() == null ? oldAff.getSemainefin() : navfoot.getSemainefin());
        navfoot.setWeekenddebut(navfoot.getWeekenddebut() == null ? oldAff.getWeekenddebut() : navfoot.getWeekenddebut());
        navfoot.setWeekendfin(navfoot.getWeekendfin() == null ? oldAff.getWeekendfin() : navfoot.getWeekendfin());
        navfoot.setColor(navfoot.getColor() == null ? oldAff.getColor() : navfoot.getColor());
        return navFootRepository.save(navfoot);
    }
}

