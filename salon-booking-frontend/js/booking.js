
// ==========================================
// API
// ==========================================

const API_BASE_URL = "http://localhost:5000";


// ==========================================
// GET DATA FROM URL
// ==========================================

const params = new URLSearchParams(window.location.search);

const salonId = params.get("salonId");
const serviceId = params.get("serviceId");


// ==========================================
// ELEMENTS
// ==========================================

const salonName = document.getElementById("salonName");
const salonLocation = document.getElementById("salonLocation");
const salonImage = document.getElementById("salonImage");

const serviceSelect = document.getElementById("service");
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

const bookingForm = document.getElementById("bookingForm");

const summarySalon = document.getElementById("summarySalon");
const summaryService = document.getElementById("summaryService");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
const totalPrice = document.getElementById("totalPrice");


// ==========================================
// STORE DATA
// ==========================================

let services = [];

let currentUser = null;


// ==========================================
// GET TOKEN
// ==========================================

const token = localStorage.getItem("accessToken");


// ==========================================
// LOAD SALON
// ==========================================

async function loadSalon() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/salons/${salonId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load salon");
        }

        const salon = await response.json();

        salonName.textContent =
            salon.name || "Salon";

        salonLocation.textContent =
            `📍 ${salon.address || ""}, ${salon.city || ""}`;

        salonImage.src =
            salon.imageUrl ||
            "https://images.pexels.com/photos/7447147/pexels-photo-7447147.jpeg";

        summarySalon.textContent =
            salon.name || "Salon";

    }
    catch (error) {

        console.error("Error loading salon:", error);

    }
}


// ==========================================
// LOAD SERVICES
// ==========================================

async function loadServices() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/service/salon/${salonId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load services");
        }

        services = await response.json();

        serviceSelect.innerHTML = `
            <option value="">
                Select a service
            </option>
        `;


        services.forEach(service => {

            const option = document.createElement("option");

            option.value = service.id;

            option.textContent =
                `${service.name} - ₹${service.price}`;

            serviceSelect.appendChild(option);

        });


        // Automatically select service
        // received from salon-details page

        if (serviceId) {
            serviceSelect.value = serviceId;
        }


        updateServiceSummary();

    }
    catch (error) {

        console.error(
            "Error loading services:",
            error
        );

        serviceSelect.innerHTML = `
            <option value="">
                Unable to load services
            </option>
        `;

    }
}


// ==========================================
// UPDATE SERVICE SUMMARY
// ==========================================

function updateServiceSummary() {

    const selectedId = serviceSelect.value;

    const selectedService = services.find(
        service =>
            String(service.id) ===
            String(selectedId)
    );


    if (!selectedService) {

        summaryService.textContent =
            "Not selected";

        totalPrice.textContent =
            "₹0";

        return;
    }


    summaryService.textContent =
        selectedService.name;

    totalPrice.textContent =
        `₹${selectedService.price}`;
}


// ==========================================
// SERVICE CHANGE
// ==========================================

serviceSelect.addEventListener(
    "change",
    updateServiceSummary
);


// ==========================================
// DATE CHANGE
// ==========================================

dateInput.addEventListener(
    "change",
    () => {

        summaryDate.textContent =
            dateInput.value || "Not selected";

    }
);


// ==========================================
// TIME CHANGE
// ==========================================

timeSelect.addEventListener(
    "change",
    () => {

        const selectedOption =
            timeSelect.options[
                timeSelect.selectedIndex
            ];


        summaryTime.textContent =
            timeSelect.value
                ? selectedOption.textContent
                : "Not selected";

    }
);


// ==========================================
// LOAD LOGGED-IN USER
// ==========================================

async function loadUserProfile() {

    if (!token) {

        console.error(
            "Access token not found"
        );

        return;

    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/users/profile`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load user profile"
            );

        }


        currentUser =
            await response.json();


        console.log(
            "Logged-in user:",
            currentUser
        );


        // Fill user information

        nameInput.value =
            currentUser.name || "";

        phoneInput.value =
            currentUser.phone || "";

    }
    catch (error) {

        console.error(
            "Error loading user profile:",
            error
        );

    }
}


// ==========================================
// BOOKING SUBMIT
// ==========================================

bookingForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Check user

        if (!currentUser) {

            alert(
                "Please login before booking."
            );

            return;

        }


        // Check service

        const selectedService =
            services.find(
                service =>
                    String(service.id) ===
                    String(serviceSelect.value)
            );


        if (!selectedService) {

            alert(
                "Please select a service."
            );

            return;

        }


        // Check date

        if (!dateInput.value) {

            alert(
                "Please select a date."
            );

            return;

        }


        // Check time

        if (!timeSelect.value) {

            alert(
                "Please select a time."
            );

            return;

        }


        // ==================================
        // BOOKING OBJECT
        // ==================================

        const booking = {

            userId:
                currentUser.id,

            salonId:
                Number(salonId),

            serviceId:
                Number(selectedService.id),

            bookingDate:
                dateInput.value,

            bookingTime:
                timeSelect.value,

            amount:
                Number(selectedService.price)

        };


        console.log(
            "Sending booking:",
            booking
        );


        // ==================================
        // SEND TO BACKEND
        // ==================================

        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/bookings`,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(booking)

                    }
                );


            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "Booking failed:",
                    errorText
                );

                throw new Error(
                    "Booking failed"
                );

            }


            const savedBooking =
                await response.json();


            console.log(
                "Booking created:",
                savedBooking
            );


            alert(
                "Appointment booked successfully!"
            );


            // Later we will create this page
            window.location.href =
                "my-bookings.html";

        }
        catch (error) {

            console.error(
                "Error creating booking:",
                error
            );

            alert(
                "Unable to book appointment. Please try again."
            );

        }

    }
);


// ==========================================
// PREVENT PAST DATES
// ==========================================

const today =
    new Date()
        .toISOString()
        .split("T")[0];

dateInput.min = today;


// ==========================================
// INITIAL LOAD
// ==========================================

loadSalon();

loadServices();

loadUserProfile();

