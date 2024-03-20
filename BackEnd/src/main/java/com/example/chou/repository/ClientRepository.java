package com.example.chou.repository;

import com.example.chou.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("SELECT f FROM Client f WHERE f.mail=?1 and f.password=?2")
    Client findClientByMailAAndPassword(String mail, String password);
}
