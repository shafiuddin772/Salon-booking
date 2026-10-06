package com.salon.salonservice.service.serviceImp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.salon.salonservice.entity.Salon;
import com.salon.salonservice.repository.SalonRepository;
import com.salon.salonservice.service.SalonService;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {

    private  final SalonRepository repo;

    @Override
    public Salon createSalon(Salon salon){
        salon.setActive(true);
        return repo.save(salon);
    }

//GET ALL SALONS
    @Override
    public List<Salon> getAllSalon(){
        return repo.findAll();
    }

//    GET SALON BY ID
    @Override
    public Salon getSalonById(Long id){
        return repo.findById(id).orElseThrow(()->new RuntimeException("Salon not found with id: "+id));
    }
//    SEARCH SALON BY CITY
    @Override
    public List<Salon> searchByCity(String city){
        return repo.findByCityIgnoreCase(city);
    }
//    SEARCH SALON BY NAME + CITY OR NAME ONLY
    @Override
    public List<Salon>searchSalons(String city, String name){
        return repo.findByCityIgnoreCaseAndNameContainingIgnoreCase(city,name);
    }

}
