package com.salon.serviceoffering.service;

import com.salon.serviceoffering.entity.ServiceOffering;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ServiceOfferingService {
ServiceOffering createService(ServiceOffering service);
List<ServiceOffering>getAllServices();
ServiceOffering getServiceById(Long id);
List<ServiceOffering>getServicesBySalonId(Long salonId);
}
