package com.salon.serviceoffering.controller;

import com.salon.serviceoffering.entity.ServiceOffering;
import com.salon.serviceoffering.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service")
@RequiredArgsConstructor
public class ServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    // CREATE SERVICE
    @PostMapping
    public ResponseEntity<ServiceOffering> CreateService(
            @RequestBody ServiceOffering service
    ) {
        return ResponseEntity.ok(serviceOfferingService.createService(service));
    }

    // GET ALL SERVICE
    @GetMapping
    public ResponseEntity<List<ServiceOffering>> getAllServices() {
        return ResponseEntity.ok(serviceOfferingService.getAllServices());
    }

    // GET SERVICE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceOffering> getServiceById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(serviceOfferingService.getServiceById(id));
    }

    // GET SERVICE BY SALON ID
    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<ServiceOffering>> getServiceBySalonId(
            @PathVariable Long salonId
    ) {
        return ResponseEntity.ok(serviceOfferingService.getServicesBySalonId(salonId));
    }
}