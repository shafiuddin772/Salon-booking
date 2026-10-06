# Find Salon – Salon Booking Application

**Find Salon** is a full-stack salon booking application that connects **salon owners with customers**. Users can explore salons, view available services, check prices, and book appointments online.

The backend is built using **Java and Spring Boot microservices**, with **Spring Cloud Eureka** for service discovery and an **API Gateway** for centralized routing.

---

## 🚀 Features

### 👤 User Features

* User registration and login
* Password encryption using BCrypt
* JWT-based authentication
* Protected user profile
* Browse available salons
* Search salons by name
* Filter salons by location
* Filter salons by category
* View salon details
* View available services and prices
* Select appointment date and time
* Book appointments
* View previous and upcoming bookings

### 💇 Salon Features

* Salon information
* Salon location and contact details
* Salon description
* Available services
* Service pricing
* Service duration

### 📅 Booking Features

* Select salon
* Select service
* Select date
* Select time
* Automatic booking amount
* User-specific booking history
* Upcoming and previous appointments

---

# 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      Frontend        │
                    │    HTML / CSS / JS   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     API Gateway      │
                    │       Port 5000       │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌───────────────┐
       │   User     │   │   Salon    │   │    Booking    │
       │  Service   │   │  Service   │   │    Service    │
       │   :5001    │   │   :5002    │   │     :5005     │
       └─────┬──────┘   └─────┬──────┘   └───────┬───────┘
             │                │                  │
             ▼                ▼                  ▼
          userdb           salondb            bookingdb


                    ┌──────────────────────┐
                    │ Service Offering     │
                    │      :5003           │
                    └──────────┬───────────┘
                               │
                               ▼
                         serviceofferingdb


                    ┌──────────────────────┐
                    │       Eureka         │
                    │   Service Discovery  │
                    │       :8070          │
                    └──────────────────────┘
```

---

# 🛠️ Technologies Used

## Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Cloud Gateway
* Spring Cloud Netflix Eureka
* Spring Cloud LoadBalancer
* Spring Security
* JWT
* BCrypt
* Lombok
* Gradle

## Database

* MySQL

## Frontend

* HTML5
* CSS3
* JavaScript

## Tools

* IntelliJ IDEA
* Git
* GitHub
* Postman
* MySQL Workbench
* Docker

---

# 📂 Project Stru
