
// // ==========================================
// // API
// // ==========================================

// const API_BASE_URL = "http://localhost:5000";


// // ==========================================
// // ELEMENTS
// // ==========================================

// const salonContainer =
//     document.getElementById("salonContainer");

// const salonSearch =
//     document.getElementById("salonSearch");

// const locationSelect =
//     document.getElementById("location");

// const categorySelect =
//     document.getElementById("category");

// const searchBtn =
//     document.getElementById("searchBtn");


// // Store salons received from backend

// let allSalons = [];



// // ==========================================
// // LOAD SALONS
// // ==========================================

// async function loadSalons() {

//     try {

//         const response = await fetch(
//             `${API_BASE_URL}/api/salons`
//         );


//         if (!response.ok) {

//             throw new Error(
//                 "Failed to fetch salons"
//             );

//         }


//         allSalons = await response.json();


//         displaySalons(allSalons);

//     }
//     catch (error) {

//         console.error(
//             "Error loading salons:",
//             error
//         );


//         salonContainer.innerHTML =
//             "<p>Unable to load salons. Please try again.</p>";

//     }

// }



// // ==========================================
// // DISPLAY SALONS
// // ==========================================

// function displaySalons(salons) {

//     salonContainer.innerHTML = "";


//     if (salons.length === 0) {

//         salonContainer.innerHTML =
//             "<p>No salons available.</p>";

//         return;

//     }


//     salons.forEach(salon => {


//         const card =
//             document.createElement("div");


//         card.className =
//             "salon-card";


//         card.innerHTML = `

//             <div class="salon-image">

//                 <img
//                     src="${
//                         salon.imageUrl ||
//                         "https://images.pexels.com/photos/7447147/pexels-photo-7447147.jpeg"
//                     }"
//                     alt="${salon.name || "Salon"}"
//                 >

//             </div>


//             <div class="salon-info">

//                 <h3>

//                     ${salon.name || "Salon"}

//                     <span class="rating">
//                         ★ 4.8
//                     </span>

//                 </h3>


//                 <p class="location">

//                     📍
//                     ${salon.address || ""}
//                     ${salon.city ? ", " + salon.city : ""}

//                 </p>


//                 <p>

//                     ${salon.description || ""}

//                 </p>

//             </div>


//             <div class="salon-services">
//             </div>


//             <div class="salon-bottom">

//                 <span class="price">

//                     <a
//                         href="salon-details.html?id=${salon.id}"
//                         class="view-btn"
//                     >

//                         <button
//                             type="button"
//                             style="margin: 2rem;"
//                         >
//                             View Salon
//                         </button>

//                     </a>

//                 </span>

//             </div>

//         `;


//         salonContainer.appendChild(card);

//     });

// }



// // ==========================================
// // SEARCH / FILTER
// // ==========================================

// function filterSalons() {

//     const searchText =
//         salonSearch.value
//             .trim()
//             .toLowerCase();


//     const location =
//         locationSelect.value
//             .trim()
//             .toLowerCase();


//     const filteredSalons =
//         allSalons.filter(salon => {


//             const name =
//                 (salon.name || "")
//                     .toLowerCase();


//             const city =
//                 (salon.city || "")
//                     .toLowerCase();


//             const address =
//                 (salon.address || "")
//                     .toLowerCase();


//             const matchesName =
//                 name.includes(searchText);


//             const matchesLocation =
//                 !location ||
//                 city.includes(location) ||
//                 address.includes(location);


//             return (
//                 matchesName &&
//                 matchesLocation
//             );

//         });


//     displaySalons(filteredSalons);

// }



// // ==========================================
// // SEARCH BUTTON
// // ==========================================

// searchBtn.addEventListener(
//     "click",
//     filterSalons
// );



// // ==========================================
// // SEARCH BY ENTER KEY
// // ==========================================

// salonSearch.addEventListener(
//     "keydown",
//     event => {

//         if (event.key === "Enter") {

//             filterSalons();

//         }

//     }
// );



// // ==========================================
// // LOAD PAGE
// // ==========================================

// loadSalons();


// ==========================================
// GET ELEMENTS
// ==========================================


document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // GET ELEMENTS
    // ==============================

    const searchInput =
        document.getElementById("salonSearch");

    const locationSelect =
        document.getElementById("location");

    const categorySelect =
        document.getElementById("category");

    const searchButton =
        document.getElementById("searchBtn");

    const salonCards =
        document.querySelectorAll(".salon-card");


    // Check whether cards are found

    console.log(
        "Total salon cards:",
        salonCards.length
    );


    // ==============================
    // FILTER FUNCTION
    // ==============================

    function filterSalons() {

        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        const selectedLocation =
            locationSelect.value
                .trim()
                .toLowerCase();


        const selectedCategory =
            categorySelect.value
                .trim()
                .toLowerCase();


        console.log("Search:", searchText);
        console.log("Location:", selectedLocation);
        console.log("Category:", selectedCategory);


        let visibleSalons = 0;


        // ==============================
        // CHECK EVERY SALON
        // ==============================

        salonCards.forEach(function (card) {


            // Salon name

            const salonName =
                card.querySelector("h3")
                    .textContent
                    .trim()
                    .toLowerCase();


            // Salon location

            const salonLocation =
                card
                    .getAttribute("data-location")
                    .toLowerCase();


            // Salon category

            const salonCategory =
                card
                    .getAttribute("data-category")
                    .toLowerCase();


            // ==============================
            // SEARCH MATCH
            // ==============================

            const nameMatch =
                salonName.includes(searchText);


            // ==============================
            // LOCATION MATCH
            // ==============================

            const locationMatch =
                selectedLocation === "" ||
                salonLocation === selectedLocation;


            // ==============================
            // CATEGORY MATCH
            // ==============================

            const categoryMatch =
                selectedCategory === "" ||
                salonCategory
                    .split(" ")
                    .includes(selectedCategory);


            // ==============================
            // SHOW / HIDE
            // ==============================

            if (
                nameMatch &&
                locationMatch &&
                categoryMatch
            ) {

                card.hidden = false;

                visibleSalons++;

            } else {

                card.hidden = true;

            }

        });


        console.log(
            "Visible salons:",
            visibleSalons
        );

    }


    // ==============================
    // SEARCH BUTTON
    // ==============================

    searchButton.addEventListener(
        "click",
        filterSalons
    );


    // ==============================
    // ENTER KEY
    // ==============================

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                filterSalons();

            }

        }
    );


    // ==============================
    // LOCATION CHANGE
    // ==============================

    locationSelect.addEventListener(
        "change",
        filterSalons
    );


    // ==============================
    // CATEGORY CHANGE
    // ==============================

    categorySelect.addEventListener(
        "change",
        filterSalons
    );


});

