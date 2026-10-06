package com.salon.salonservice.service;

import com.salon.salonservice.entity.Salon;

import java.util.List;

public interface SalonService {
    Salon createSalon(Salon salon);
    List<Salon>getAllSalon();
    Salon getSalonById(Long id);
   List<Salon> searchByCity(String city);
   List<Salon>searchSalons(String city, String name);
}
