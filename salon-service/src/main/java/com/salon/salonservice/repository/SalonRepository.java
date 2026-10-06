package com.salon.salonservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salon.salonservice.entity.Salon;

import java.util.List;

public interface SalonRepository extends JpaRepository<Salon,Long> {
List<Salon>findByCityIgnoreCase(String city);
List<Salon>findByCityIgnoreCaseAndNameContainingIgnoreCase(
        String city,
        String name
);
}
