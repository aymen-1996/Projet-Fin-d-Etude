package com.example.chou.enums;

public enum UserRole {
    ADMIN("admin"), FOURNISSEUR("fournisseur"), CLIENT("client");
    private String role;

    private UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }
}
