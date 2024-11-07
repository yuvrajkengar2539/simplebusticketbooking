// Function to get a cookie by name
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return JSON.parse(cookie[1]);
        }
    }
    return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiry time in days
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${JSON.stringify(value)}; ${expires}; path=/`;
}

// Function to show available seats
function showAvailableSeats() {
    const from = document.getElementById('From').value;
    const to = document.getElementById('To').value;

    // Create the route key
    const routeKey = `${from}-${to}`;
    
    // Retrieve available seats from cookies
    const availableSeats = getCookie('availableSeats');
    if (availableSeats && availableSeats[routeKey] !== undefined) {
        alert(`Available Seats: ${availableSeats[routeKey]}`);
    } else {
        alert('Seats information for this route is not available.');
    }
}

// Function to initialize available seats in cookies
function initializeSeats() {
    const initialSeats = {
        'ahmednagar-akola': 30,
        'ahmednagar-amravati': 25,
        'akola-amravati': 40,
        'aurangabad-pune': 20,
        // Add other routes as needed
    };

    // Check if the cookie is already set
    const existingSeats = getCookie('availableSeats');
    if (!existingSeats) {
        setCookie('availableSeats', initialSeats, 7); // Set cookies with a 7-day expiry
    }
}

// Function to handle booking and updating available seats
function redirectToPayement(event) {
    event.preventDefault();

    const name = document.getElementById('Name').value;
    const from = document.getElementById('From').value;
    const to = document.getElementById('To').value;
    const date = document.getElementById('ondate').value;
    const seats = parseInt(document.getElementById('Seats').value, 10);
    const busnumber = `MH XX ${Math.floor(1000 + Math.random() * 9000)}`;

    const routeKey = `${from}-${to}`;

    // Retrieve available seats from cookies
    let availableSeats = getCookie('availableSeats') || {};

    // Check if the route exists in availableSeats
    if (availableSeats[routeKey] === undefined) {
        alert('Seats information for this route is not available.');
        return;
    }

    // Check if there are enough available seats
    if (availableSeats[routeKey] < seats) {
        alert('Sorry, there are not enough available seats for this route.');
        return;
    }

    // Reduce the available seats
    availableSeats[routeKey] -= seats;

    // Save the updated available seats in cookies
    setCookie('availableSeats', availableSeats, 7); // Cookie expiry in 7 days

    // Store values in session storage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('from', from);
    sessionStorage.setItem('to', to);
    sessionStorage.setItem('date', date);
    sessionStorage.setItem('seats', seats);
    sessionStorage.setItem('busnumber', busnumber);

    // Redirect to the payment page
    window.location.href = "payment.html";
}

// Run the initialization function on page load
initializeSeats();
