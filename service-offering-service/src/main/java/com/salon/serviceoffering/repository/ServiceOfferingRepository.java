package com.salon.serviceoffering.repository;

import com.salon.serviceoffering.entity.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering,Long> {
List<ServiceOffering>findBySalonId(Long salonId);
}
