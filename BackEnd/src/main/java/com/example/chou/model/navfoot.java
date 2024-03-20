package com.example.chou.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class navfoot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long semainedebut;
    private Long semainefin;
    private Long weekenddebut;
    private Long weekendfin;
    private Long numtel;
    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSemainedebut() {
        return semainedebut;
    }

    public void setSemainedebut(Long semainedebut) {
        this.semainedebut = semainedebut;
    }

    public Long getSemainefin() {
        return semainefin;
    }

    public void setSemainefin(Long semainefin) {
        this.semainefin = semainefin;
    }

    public Long getWeekenddebut() {
        return weekenddebut;
    }

    public void setWeekenddebut(Long weekenddebut) {
        this.weekenddebut = weekenddebut;
    }

    public Long getWeekendfin() {
        return weekendfin;
    }

    public void setWeekendfin(Long weekendfin) {
        this.weekendfin = weekendfin;
    }

    public Long getNumtel() {
        return numtel;
    }

    public void setNumtel(Long numtel) {
        this.numtel = numtel;
    }
}
