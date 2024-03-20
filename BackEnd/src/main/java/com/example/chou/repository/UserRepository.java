package com.example.chou.repository;


import com.example.chou.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.mail=?1 ")
    User findUserByMail(String mail);

    @Query("SELECT u FROM User u WHERE u.mail=?1 and u.password=?2")
    User findUserByMailAAndPassword(String mail, String password);

    User findByMail(String mail);
    /*org.springframework.security.core.userdetails.User findByMail(String mail);*/


}
