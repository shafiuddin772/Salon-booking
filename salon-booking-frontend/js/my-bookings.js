// ==========================================
// API
// ==========================================

const API_BASE_URL = "http://localhost:5000";


// ==========================================
// TOKEN
// ==========================================

const token =
    localStorage.getItem("accessToken");


// ==========================================
// ELEMENTS
// ==========================================

const upcomingBookings =
    document.getElementById(
        "upcomingBookings"
    );

const previousBookings =
    document.getElementById(
        "previousBookings"
    );

const upcomingCount =
    document.getElementById(
        "upcomingCount"
    );

const previousCount =
    document.getElementById(
        "previousCount"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


// ==========================================
// CHECK LOGIN
// ==========================================

if (!token) {

    alert(
        "Please login to view your bookings."
    );

    window.location.href =
        "login.html";
}


// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        localStorage.removeItem(
            "accessToken"
        );

        window.location.href =
            "login.html";
    }
);


// ==========================================
// LOAD USER PROFILE
// ==========================================

async function loadUserProfile() {

    try {

        const response =
            await fetch(
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


        const user =
            await response.json();


        console.log(
            "Logged-in user:",
            user
        );


        // Get user's bookings

        loadBookings(user.id);

    }
    catch (error) {

        console.error(
            "Error loading user profile:",
            error
        );


        upcomingBookings.innerHTML =
            "<p>Unable to load your profile.</p>";

        previousBookings.innerHTML =
            "<p>Unable to load your profile.</p>";
    }
}


// ==========================================
// LOAD BOOKINGS
// ==========================================

async function loadBookings(userId) {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/bookings/user/${userId}`,
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
                "Failed to load bookings"
            );
        }


        const bookings =
            await response.json();


        console.log(
            "User bookings:",
            bookings
        );


        displayBookings(bookings);

    }
    catch (error) {

        console.error(
            "Error loading bookings:",
            error
        );


        upcomingBookings.innerHTML =
            "<p>Unable to load bookings.</p>";

        previousBookings.innerHTML =
            "<p>Unable to load bookings.</p>";
    }
}


// ==========================================
// DISPLAY BOOKINGS
// ==========================================

function displayBookings(bookings) {

    upcomingBookings.innerHTML = "";

    previousBookings.innerHTML = "";


    // ======================================
    // NO BOOKINGS
    // ======================================

    if (!bookings || bookings.length === 0) {

        upcomingCount.textContent =
            "0 Bookings";

        previousCount.textContent =
            "0 Bookings";


        upcomingBookings.innerHTML = `

            <div class="booking-card">

                <div class="booking-info">

                    <h3>
                        No appointments yet
                    </h3>

                    <p>
                        Find a salon and book
                        your first appointment.
                    </p>

                    <div class="booking-actions">

                        <a
                            href="salons.html"
                            class="view-btn"
                        >
                            Find a Salon
                        </a>

                    </div>

                </div>

            </div>

        `;

        return;
    }


    // ======================================
    // CURRENT DATE
    // ======================================

    const today =
        new Date();


    let upcoming = [];

    let previous = [];


    // ======================================
    // SEPARATE BOOKINGS
    // ======================================

    bookings.forEach(booking => {

        const bookingDate =
            new Date(
                `${booking.bookingDate}T${booking.bookingTime}`
            );


        if (
            bookingDate >= today &&
            booking.status !== "CANCELLED"
        ) {

            upcoming.push(booking);

        }
        else {

            previous.push(booking);

        }

    });


    // ======================================
    // COUNTS
    // ======================================

    upcomingCount.textContent =
        `${upcoming.length} Booking${upcoming.length !== 1 ? "s" : ""}`;

    previousCount.textContent =
        `${previous.length} Booking${previous.length !== 1 ? "s" : ""}`;


    // ======================================
    // DISPLAY UPCOMING
    // ======================================

    if (upcoming.length === 0) {

        upcomingBookings.innerHTML = `
            <p>
                No upcoming appointments.
            </p>
        `;

    }
    else {

        upcoming.forEach(
            booking => {

                upcomingBookings.appendChild(
                    createBookingCard(
                        booking,
                        false
                    )
                );

            }
        );

    }


    // ======================================
    // DISPLAY PREVIOUS
    // ======================================

    if (previous.length === 0) {

        previousBookings.innerHTML = `
            <p>
                No previous appointments.
            </p>
        `;

    }
    else {

        previous.forEach(
            booking => {

                previousBookings.appendChild(
                    createBookingCard(
                        booking,
                        true
                    )
                );

            }
        );

    }
}


// ==========================================
// CREATE BOOKING CARD
// ==========================================

function createBookingCard(
    booking,
    isPrevious
) {

    const card =
        document.createElement("div");


    card.className =
        "booking-card";


    // ======================================
    // STATUS
    // ======================================

    const status =
        booking.status ||
        "CONFIRMED";


    let statusClass =
        "confirmed";


    if (
        status.toUpperCase() ===
        "CANCELLED"
    ) {

        statusClass =
            "cancelled-status";

    }
    else if (
        status.toUpperCase() ===
        "COMPLETED"
    ) {

        statusClass =
            "completed-status";

    }


    // ======================================
    // DATE
    // ======================================

    const formattedDate =
        formatDate(
            booking.bookingDate
        );


    // ======================================
    // TIME
    // ======================================

    const formattedTime =
        formatTime(
            booking.bookingTime
        );


    // ======================================
    // IMAGE
    // ======================================

    const image =
        "https://images.pexels.com/photos/7447147/pexels-photo-7447147.jpeg";


    // ======================================
    // CARD
    // ======================================

    card.innerHTML = `

        <div class="booking-image">

            <img
                src="${image}"
                alt="Salon"
            >

        </div>


        <div class="booking-info">

            <div class="booking-top">

                <div>

                    <h3>
                        Salon #${booking.salonId}
                    </h3>

                    <p class="location">
                        📍 Salon ID:
                        ${booking.salonId}
                    </p>

                </div>


                <span
                    class="status ${statusClass}"
                >
                    ${status}
                </span>

            </div>


            <div class="booking-details">

                <div>

                    <span>
                        Service
                    </span>

                    <strong>
                        Service #${booking.serviceId}
                    </strong>

                </div>


                <div>

                    <span>
                        Date
                    </span>

                    <strong>
                        ${formattedDate}
                    </strong>

                </div>


                <div>

                    <span>
                        Time
                    </span>

                    <strong>
                        ${formattedTime}
                    </strong>

                </div>


                <div>

                    <span>
                        Amount
                    </span>

                    <strong>
                        ₹${booking.amount}
                    </strong>

                </div>

            </div>


            <div class="booking-actions">

                <a
                    href="salon-details.html?id=${booking.salonId}"
                    class="view-btn"
                >
                    View Salon
                </a>


                ${
                    !isPrevious &&
                    status.toUpperCase() !== "CANCELLED"
                    ?
                    `
                    <button
                        class="cancel-btn"
                        type="button"
                        onclick="cancelBooking(${booking.id})"
                    >
                        Cancel Booking
                    </button>
                    `
                    :
                    ""
                }

            </div>

        </div>

    `;


    return card;
}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(dateString) {

    if (!dateString) {
        return "N/A";
    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(timeString) {

    if (!timeString) {
        return "N/A";
    }


    const parts =
        timeString.split(":");


    let hour =
        Number(parts[0]);

    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    if (hour === 0) {
        hour = 12;
    }
    else if (hour > 12) {
        hour -= 12;
    }


    return `${hour}:${minute} ${period}`;
}


// ==========================================
// CANCEL BOOKING
// ==========================================

async function cancelBooking(bookingId) {

    alert(
        "Cancel booking functionality will be added next."
    );

}


// ==========================================
// START
// ==========================================

loadUserProfile();

