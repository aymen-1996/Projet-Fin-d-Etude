package com.example.chou.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity

public class Panier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quntité;
    private Float prixtotal;
    @OneToMany(mappedBy = "panier")
    private List<Client> clientListList;

    @JsonIgnore

    public List<Client> getClientListList() {
        return clientListList;
    }

    public void setClientListList(List<Client> clientListList) {
        this.clientListList = clientListList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuntité() {
        return quntité;
    }

    public void setQuntité(Integer quntité) {
        this.quntité = quntité;
    }

    public Float getPrixtotal() {
        return prixtotal;
    }

    public void setPrixtotal(Float prixtotal) {
        this.prixtotal = prixtotal;
    }
}
