
// ==========================================
// IMAGE SLIDER
// ==========================================

const slides =
    document.querySelector(".slides");

const images =
    document.querySelectorAll(".slides img");

const prev =
    document.querySelector(".prev");

const next =
    document.querySelector(".next");

let index = 0;


function showSlide() {

    slides.style.transform =
        `translateX(-${index * 100}%)`;

}


next.addEventListener("click", () => {

    index++;

    if (index >= images.length) {
        index = 0;
    }

    showSlide();

});


prev.addEventListener("click", () => {

    index--;

    if (index < 0) {
        index = images.length - 1;
    }

    showSlide();

});



// ==========================================
// API CONFIGURATION
// ==========================================

const API_BASE_URL =
    "http://localhost:5000";



// ==========================================
// GET SALON ID
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const salonId =
    params.get("id");



// ==========================================
// LOAD SALON DETAILS
// ==========================================

async function loadSalonDetails() {

    if (!salonId) {

        console.error(
            "Salon ID not found in URL"
        );

        return;

    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/salons/${salonId}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load salon details"
            );

        }


        const salon =
            await response.json();


        document.getElementById(
            "salonName"
        ).textContent =
            salon.name || "Salon";


        document.getElementById(
            "salonLocation"
        ).textContent =
            `${salon.address || ""}, ${salon.city || ""}`;


        document.getElementById(
            "salonDescription"
        ).textContent =
            salon.description ||
            "No description available.";


        document.getElementById(
            "salonPhone"
        ).textContent =
            salon.phone ||
            "Not available";


    } catch (error) {

        console.error(
            "Error loading salon:",
            error
        );

    }

}



// ==========================================
// LOAD SERVICES
// ==========================================

async function loadServices() {

    if (!salonId) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/service/salon/${salonId}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load services"
            );

        }


        const services =
            await response.json();


        const serviceList =
            document.getElementById(
                "serviceList"
            );


        serviceList.innerHTML = "";


        if (services.length === 0) {

            serviceList.innerHTML =
                "<p>No services available for this salon.</p>";

            return;

        }



        // ==========================================
        // CREATE SERVICE CARDS
        // ==========================================

        services.forEach(service => {

            const serviceCard =
                document.createElement("div");


            serviceCard.className =
                "service-card";


            serviceCard.innerHTML = `

                <div>

                    <h3>
                        ${service.name}
                    </h3>

                    <p>
                        ${service.description || ""}
                    </p>

                    <span>
                        ${service.duration || 0} min
                    </span>

                </div>


                <div class="service-price">

                    <strong>
                        ₹${service.price || 0}
                    </strong>


                    <a
                        href="booking.html?serviceId=${service.id}&salonId=${salonId}"
                        class="service-book-btn"
                    >
                        Book
                    </a>

                </div>

            `;


            serviceList.appendChild(
                serviceCard
            );

        });


    } catch (error) {

        console.error(
            "Error loading services:",
            error
        );

    }

}



// ==========================================
// TOP BOOK BUTTON
// ==========================================

function scrollToServices() {

    const servicesSection =
        document.querySelector(
            ".services-section"
        );


    if (servicesSection) {

        servicesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}



// ==========================================
// LOAD DATA
// ==========================================

loadSalonDetails();

loadServices();

