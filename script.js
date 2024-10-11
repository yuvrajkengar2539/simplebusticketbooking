function redirectToPayement(event){
    event.preventDefault();

    const name = document.getElementById('Name').value;
    const from = document.getElementById('From').value;
    const to = document.getElementById('To').value;
    const date = document.getElementById('ondate').value;
    const seats = document.getElementById('Seats').value;

    if(from==to){
        alert("Pickup and Drop location should not be same!");
    }
    console.log();
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('from', from);
    sessionStorage.setItem('to', to);
    sessionStorage.setItem('date', date);
    sessionStorage.setItem('seats', seats);

    window.location.href="payment.html";
}