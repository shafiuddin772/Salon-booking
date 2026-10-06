package com.salon.userservice.service.impl;

import com.salon.userservice.dto.LoginRequest;
import com.salon.userservice.dto.LoginResponse;
import com.salon.userservice.dto.SignUpRequest;
import com.salon.userservice.entity.User;
import com.salon.userservice.repository.UserRepository;
import com.salon.userservice.service.JwtService;
import com.salon.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository repo;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

//  SIGN UP IMPLEMENTATION
   @Override
    public User signup(SignUpRequest request){

      if(repo.existsByEmail(request.getEmail())){
          throw new RuntimeException("Email already registered");
      }

      User user = new User();

      user.setName(request.getName());
      user.setEmail(request.getEmail());
      user.setPhone(request.getPhone());
      //Hash password before saving
      user.setPassword(passwordEncoder.encode(request.getPassword()));
      user.setRole("USER");

      return repo.save(user);
  }

//LOGIN IMPLEMENTATION
    @Override
    public LoginResponse login(LoginRequest request){
       User user=repo.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("Invalid Email or Password"));

       if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
           throw new RuntimeException("Invalid email or password");
       }
       String token=jwtService.generateToken(user.getEmail());
       return new LoginResponse(
               "Login successfull",
               token
       );
    }

//    FETCH DATA
    @Override
    public User getProfile(String email){
       return repo.findByEmail(email).orElseThrow(()->new RuntimeException("User not Found"));
    }
}
