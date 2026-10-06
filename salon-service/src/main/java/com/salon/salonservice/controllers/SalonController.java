package com.salon.salonservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.salon.salonservice.entity.Salon;
import com.salon.salonservice.service.SalonService;

import java.util.List;

@RequestMapping("/api/salons")
@org.springframework.web.bind.annotation.RestController
@RequiredArgsConstructor
public class SalonController {
   private final SalonService salonService;

//   CREATE SALON END POINT
   @PostMapping
    public ResponseEntity<Salon>createSalon(
            @RequestBody Salon salon
   ){
       Salon savedSalon=salonService.createSalon(salon);
       return ResponseEntity.ok(savedSalon);
   }
//FIND ALL SALONS END POINT
   @GetMapping
    public ResponseEntity<List<Salon>>getAllSalons(){
       List<Salon>salons=salonService.getAllSalon();
       return ResponseEntity.ok(salons);
   }
//   FIND SALON BY ID
   @GetMapping("/{id}")
    public ResponseEntity<Salon>getSalonById(
            @PathVariable Long id
   ){
Salon salon1=salonService.getSalonById(id);
return ResponseEntity.ok(salon1);
   }
//   SEARCH CITY
@GetMapping("/search/city")
public ResponseEntity<List<Salon>> searchByCity(
        @RequestParam String city) {

    return ResponseEntity.ok(
            salonService.searchByCity(city)
    );
}
//SEARCH SALON
@GetMapping("/search")
public ResponseEntity<List<Salon>> searchSalon(
        @RequestParam String city,
        @RequestParam String name) {

    return ResponseEntity.ok(
            salonService.searchSalons(city, name)
    );
}
}
