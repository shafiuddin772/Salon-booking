//POST /api/users/signup   → Public
//POST /api/users/login    → Public
//GET  /api/users/profile  → JWT required


package com.salon.userservice.controller;

import com.salon.userservice.dto.LoginRequest;
import com.salon.userservice.dto.LoginResponse;
import com.salon.userservice.dto.SignUpRequest;
import com.salon.userservice.entity.User;
import com.salon.userservice.repository.UserRepository;
import com.salon.userservice.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.Authenticator;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    public final UserService userService;

//    SIGN UP END POINT
    @PostMapping("/signup")
    public ResponseEntity<User>signup(@RequestBody SignUpRequest request){
        User user=userService.signup(request);
        return ResponseEntity.ok(user);
    }
//    LOGIN END POINT
    @PostMapping("/login")
    public ResponseEntity<LoginResponse>login(@RequestBody LoginRequest request){
       LoginResponse response=userService.login(request);
        return ResponseEntity.ok(response);
    }
//   PROTECTED END POINT
    @GetMapping("/profile")
    public ResponseEntity<User>profile(Authentication authentication){

        String email=authentication.getName();
        User user=userService.getProfile(email);
        return ResponseEntity.ok(user);
    }



}