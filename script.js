let selectedSeats = [];
let selectedBus = "";
let ticketPrice = 0;

function searchBuses() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const passengers = document.getElementById("passengers").value;
    const results = document.getElementById("results");

    if (from === to) {
        results.innerHTML = `
            <div class="bus-card">
                <h3>Please select different locations.</h3>
            </div>
        `;
        return;
    }

    if (!date) {
        results.innerHTML = `
            <div class="bus-card">
                <h3>Please select your travel date.</h3>
            </div>
        `;
        return;
    }

    results.innerHTML = `
        <h2>Available Buses</h2>

        <p class="search-summary">
            ${from} → ${to} | ${date} | ${passengers} passenger(s)
        </p>

        <div class="bus-card">
            <div class="bus-info">
                <div>
                    <h3>BusHub Express</h3>
                    <p>AC • Luxury Coach</p>
                </div>

                <div>
                    <strong>08:00 AM</strong>
                    <p>Departure</p>
                </div>

                <div>
                    <span class="price">৳650</span>
                    <p>per seat</p>
                </div>

                <button onclick="showSeats('BusHub Express', 650)">
                    Select
                </button>
            </div>
        </div>

        <div class="bus-card">
            <div class="bus-info">
                <div>
                    <h3>Bangladesh Star</h3>
                    <p>AC • Business Class</p>
                </div>

                <div>
                    <strong>10:30 AM</strong>
                    <p>Departure</p>
                </div>

                <div>
                    <span class="price">৳700</span>
                    <p>per seat</p>
                </div>

                <button onclick="showSeats('Bangladesh Star', 700)">
                    Select
                </button>
            </div>
        </div>
    `;
}

function showSeats(busName, price) {

    selectedSeats = [];
    selectedBus = busName;
    ticketPrice = price;

    const results = document.getElementById("results");

    const soldSeats = ["A3", "B2", "C4", "D1"];

    let seatsHTML = "";

    const rows = ["A", "B", "C", "D", "E", "F"];

    rows.forEach(row => {

        seatsHTML += `<div class="seat-row">`;

        for (let number = 1; number <= 4; number++) {

            const seat = row + number;
            const isSold = soldSeats.includes(seat);

            if (isSold) {
                seatsHTML += `
                    <button class="seat sold" disabled>
                        ${seat}
                    </button>
                `;
            } else {
                seatsHTML += `
                    <button
                        class="seat available"
                        onclick="toggleSeat('${seat}')"
                        id="seat-${seat}">
                        ${seat}
                    </button>
                `;
            }

            if (number === 2) {
                seatsHTML += `<span class="aisle"></span>`;
            }
        }

        seatsHTML += `</div>`;
    });

    results.innerHTML = `
        <div class="seat-container">

            <h2>Select Your Seat</h2>

            <p class="selected-bus">
                ${busName} • ৳${price} per seat
            </p>

            <div class="driver">
                🚍 DRIVER
            </div>

            <div class="seat-map">
                ${seatsHTML}
            </div>

            <div class="seat-legend">
                <span>🟩 Available</span>
                <span>🟥 Sold</span>
                <span>🟨 Selected</span>
            </div>

            <div class="booking-summary">

                <h3>Booking Summary</h3>

                <p>
                    Selected seats:
                    <strong id="selected-seat-text">
                        None
                    </strong>
                </p>

                <p>
                    Total:
                    <strong id="total-price">
                        ৳0
                    </strong>
                </p>

                <button
                    class="continue-button"
                    onclick="continueBooking()">
                    Continue →
                </button>

            </div>

        </div>
    `;
}

function toggleSeat(seat) {

    const button = document.getElementById("seat-" + seat);

    if (selectedSeats.includes(seat)) {

        selectedSeats = selectedSeats.filter(
            item => item !== seat
        );

        button.classList.remove("selected");

    } else {

        selectedSeats.push(seat);

        button.classList.add("selected");
    }

    updateSummary();
}

function updateSummary() {

    const seatText =
        document.getElementById("selected-seat-text");

    const total =
        document.getElementById("total-price");

    if (selectedSeats.length === 0) {

        seatText.textContent = "None";
        total.textContent = "৳0";

    } else {

        seatText.textContent =
            selectedSeats.join(", ");

        total.textContent =
            "৳" + (selectedSeats.length * ticketPrice);
    }
}

function continueBooking() {

    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;
    }

    const results = document.getElementById("results");

    const total =
        selectedSeats.length * ticketPrice;

    results.innerHTML = `

        <div class="booking-form">

            <h2>Passenger Details</h2>

            <p class="selected-bus">
                ${selectedBus}
            </p>

            <p>
                Seats:
                <strong>
                    ${selectedSeats.join(", ")}
                </strong>
            </p>

            <p>
                Total:
                <strong>
                    ৳${total}
                </strong>
            </p>

            <label>Passenger Name</label>

            <input
                type="text"
                id="passenger-name"
                placeholder="Enter full name">

            <label>WhatsApp Number</label>

            <input
                type="tel"
                id="whatsapp-number"
                placeholder="+880 1XXXXXXXXX">

            <label>Email (optional)</label>

            <input
                type="email"
                id="email"
                placeholder="example@email.com">

            <button
                class="continue-button"
                onclick="createBooking()">
                Continue to Payment →
            </button>

        </div>
    `;
}

function createBooking() {

    const name =
        document.getElementById("passenger-name").value;

    const whatsapp =
        document.getElementById("whatsapp-number").value;

    if (!name || !whatsapp) {

        alert(
            "Please enter passenger name and WhatsApp number."
        );

        return;
    }

    const bookingID =
        "BD-" +
        Date.now().toString().slice(-8);

    const total =
        selectedSeats.length * ticketPrice;

    const results =
        document.getElementById("results");

    results.innerHTML = `

        <div class="booking-form">

            <h2>Booking Created ✅</h2>

            <div class="booking-number">
                Booking ID<br>
                <strong>${bookingID}</strong>
            </div>

            <p>
                Passenger:
                <strong>${name}</strong>
            </p>

            <p>
                WhatsApp:
                <strong>${whatsapp}</strong>
            </p>

            <p>
                Bus:
                <strong>${selectedBus}</strong>
            </p>

            <p>
                Seats:
                <strong>${selectedSeats.join(", ")}</strong>
            </p>

            <p>
                Total:
                <strong>৳${total}</strong>
            </p>

            <hr>

            <h3>Payment</h3>

            <button onclick="fakePayment('bKash')">
                Pay with bKash
            </button>

            <button onclick="fakePayment('Nagad')">
                Pay with Nagad
            </button>

        </div>
    `;
}

function fakePayment(method) {

    alert(
        method +
        " payment will be connected later."
    );
}
