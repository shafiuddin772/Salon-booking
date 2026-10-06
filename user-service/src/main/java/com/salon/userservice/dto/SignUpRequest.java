package com.salon.userservice.dto;

import lombok.Data;

@Data
public class SignUpRequest {
private String name;
private String email;
private String phone;
private String password;
}
