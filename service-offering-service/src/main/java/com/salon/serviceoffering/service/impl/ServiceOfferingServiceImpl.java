package com.salon.serviceoffering.service.impl;

import com.salon.serviceoffering.entity.ServiceOffering;
import com.salon.serviceoffering.repository.ServiceOfferingRepository;
import com.salon.serviceoffering.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceOfferingServiceImpl implements ServiceOfferingService {
    private final ServiceOfferingRepository repo;

    @Override
    public ServiceOffering createService(ServiceOffering service){
        service.setActive(true);
        return repo.save(service);
    }

    @Override
    public List<ServiceOffering> getAllServices(){
        return repo.findAll();
    }

    @Override
    public ServiceOffering getServiceById(Long id){
        return repo.findById(id).orElseThrow(()->new RuntimeException("Service not found with id: "+id));
    }

    @Override
    public List<ServiceOffering>getServicesBySalonId(Long salonId){
        return repo.findBySalonId(salonId);
    }
}
