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
// Function to initialize available seats in cookies
function initializeSeats() {
    const initialSeats = {
        'ahmednagar-akola': 30,
        'ahmednagar-amravati': 25,
        'ahmednagar-aurangabad': 20,
        'ahmednagar-pune': 15,
        'ahmednagar-mumbai': 35,
        'ahmednagar-nagpur': 40,
        'ahmednagar-satara': 30,
        'akola-amravati': 40,
        'akola-nagpur': 50,
        'akola-pune': 30,
        'akola-mumbai': 20,
        'akola-sangli': 35,
        'akola-solapur': 25,
        'amravati-pune': 25,
        'amravati-mumbai': 30,
        'amravati-nagpur': 45,
        'amravati-aurangabad': 20,
        'amravati-satara': 25,
        'aurangabad-pune': 20,
        'aurangabad-mumbai': 50,
        'aurangabad-nagpur': 30,
        'aurangabad-ahmednagar': 20,
        'aurangabad-solapur': 25,
        'aurangabad-satara': 20,
        'pune-mumbai': 50,
        'pune-nagpur': 40,
        'pune-aurangabad': 25,
        'pune-akola': 30,
        'pune-amravati': 35,
        'pune-sangli': 45,
        'mumbai-akola': 25,
        'mumbai-amravati': 30,
        'mumbai-aurangabad': 20,
        'mumbai-pune': 50,
        'mumbai-satara': 30,
        'mumbai-sangli': 40,
        'mumbai-solapur': 35,
        'nagpur-akola': 40,
        'nagpur-amravati': 35,
        'nagpur-pune': 30,
        'nagpur-mumbai': 20,
        'nagpur-aurangabad': 25,
        'nagpur-satara': 30,
        'nagpur-sangli': 25,
        'nagpur-solapur': 45,
        'nagpur-washim': 40,
        'nagpur-bhandara': 50,
        'satara-pune': 45,
        'satara-mumbai': 35,
        'satara-solapur': 30,
        'satara-aurangabad': 25,
        'satara-sangli': 40,
        'sangli-pune': 30,
        'sangli-mumbai': 40,
        'sangli-solapur': 50,
        'solapur-pune': 40,
        'solapur-mumbai': 30,
        'solapur-nagpur': 25,
        'solapur-aurangabad': 30,
        'solapur-satara': 35,
        'solapur-sangli': 45,
        'solapur-akola': 20,
        'solapur-amravati': 35,
        'solapur-aurangabad': 30,
        'beed-mumbai': 25,
        'beed-pune': 30,
        'beed-nagpur': 40,
        'beed-akola': 35,
        'beed-solapur': 25,
        'beed-sangli': 30,
        'jalgaon-akola': 40,
        'jalgaon-pune': 35,
        'jalgaon-satara': 25,
        'jalgaon-solapur': 30,
        'jalgaon-mumbai': 30,
        'jalgaon-amravati': 25,
        'jalgaon-nagpur': 30,
        'jalna-pune': 35,
        'jalna-mumbai': 40,
        'jalna-solapur': 45,
        'jalna-akola': 30,
        'jalna-nagpur': 20,
        'jalna-aurangabad': 25,
        'nanded-mumbai': 30,
        'nanded-pune': 25,
        'nanded-nagpur': 45,
        'nanded-akola': 35,
        'nanded-solapur': 25,
        'nanded-aurangabad': 40,
        'navi_mumbai-pune': 30,
        'navi_mumbai-mumbai': 50,
        'navi_mumbai-akola': 40,
        'navi_mumbai-amravati': 35,
        'navi_mumbai-nagpur': 30,
        'navi_mumbai-aurangabad': 25,
        'navi_mumbai-solapur': 20,
        'navi_mumbai-satara': 45,
        'thane-pune': 30,
        'thane-mumbai': 50,
        'thane-akola': 35,
        'thane-solapur': 25,
        'thane-nagpur': 40,
        'thane-aurangabad': 30,
        'thane-sangli': 45,
        'thane-navi_mumbai': 25,
        'wardha-pune': 35,
        'wardha-mumbai': 25,
        'wardha-nagpur': 45,
        'wardha-akola': 30,
        'wardha-solapur': 20,
        'wardha-satara': 40,
        'washim-pune': 40,
        'washim-akola': 35,
        'washim-mumbai': 20,
        'washim-solapur': 30,
        'washim-nagpur': 25,
        'washim-aurangabad': 45,
        'washim-beed': 50
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
