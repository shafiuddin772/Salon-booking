package com.salon.booking.service;

import com.salon.booking.entity.Booking;

import java.awt.print.Book;
import java.util.List;

public interface BookingService {
    Booking createBooking(Booking booking);
    List<Booking>getAllBookings();
    Booking getBookingById(Long id);

//    findByUserId(1)
//→ all bookings made by user 1
//
//    findBySalonId(1)
//→ all bookings for salon 1

    List<Booking>getBookingByUserId(Long userId);
    List<Booking>getBookingBySalonId(Long salonId);
}
