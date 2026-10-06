package com.salon.booking.controller;

import com.salon.booking.entity.Booking;
import com.salon.booking.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody Booking booking
    ) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingByUserId(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(bookingService.getBookingByUserId(userId));
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<Booking>> getBookingBySalonId(
            @PathVariable Long salonId
    ) {
        return ResponseEntity.ok(bookingService.getBookingBySalonId(salonId));
    }
}
