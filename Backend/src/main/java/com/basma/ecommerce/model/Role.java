package com.basma.ecommerce.model;


import org.springframework.security.core.GrantedAuthority;


public class Role implements GrantedAuthority {

    public static final String SUPER_ADMIN = "SUPER_ADMIN";
    public static final String USER = "USER";

    private String authority;

    public static String getSuperAdmin() {
        return SUPER_ADMIN;
    }

    public static String getUSER() {
        return USER;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
