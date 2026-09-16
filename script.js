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
        <p style="margin:10px 0 20px;">
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

                <button onclick="selectBus('BusHub Express', 650)">
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

                <button onclick="selectBus('Bangladesh Star', 700)">
                    Select
                </button>

            </div>
        </div>
    `;
}

function selectBus(busName, price) {

    alert(
        "You selected " +
        busName +
        "\\nTicket price: ৳" +
        price +
        "\\n\\nNext step: Seat selection"
    );
}
