package com.salon.userservice.service;

import com.salon.userservice.dto.LoginRequest;
import com.salon.userservice.dto.LoginResponse;
import com.salon.userservice.dto.SignUpRequest;
import com.salon.userservice.entity.User;

public interface UserService {
User signup(SignUpRequest request);
LoginResponse  login(LoginRequest request);
User getProfile(String email);
}
