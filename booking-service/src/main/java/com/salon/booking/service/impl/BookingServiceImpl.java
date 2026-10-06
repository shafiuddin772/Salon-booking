package com.salon.booking.service.impl;

import com.salon.booking.entity.Booking;
import com.salon.booking.repository.BookingRepository;
import com.salon.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
private final BookingRepository repo;

@Override
public Booking createBooking(Booking booking){
    booking.setStatus("PENDING");
    return repo.save(booking);
}

@Override
public List<Booking>getAllBookings(){
    return repo.findAll();
}

@Override
public Booking getBookingById(Long id){
    return repo.findById(id).orElseThrow(()->new RuntimeException("Booking not found with id: "+id));
}

@Override
    public List<Booking> getBookingByUserId(Long userId){
    return repo.findByUserId(userId);
}


@Override
    public List<Booking>getBookingBySalonId(Long salonId){
    return repo.findBySalonId(salonId);
}





}
