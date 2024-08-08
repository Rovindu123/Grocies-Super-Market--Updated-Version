document.getElementById('processPaymentButton').addEventListener('click', processPayment);

var form = document.getElementById('paymentForm');

// Load the order summary
function loadOrderSummary() {
    var order = JSON.parse(localStorage.getItem('orderSummary'));
    var itemNames = JSON.parse(localStorage.getItem('itemNames'));
    var tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    var total = 0;

    if (order && itemNames) {
        tableBody.innerHTML = ''; // Clear any existing rows
        for (var itemPrice in order) {
            var quantity = order[itemPrice].quantity;
            var price = order[itemPrice].price;
            total += price;

            var row = tableBody.insertRow();
            row.insertCell(0).textContent = itemNames[itemPrice];
            row.insertCell(1).textContent = quantity;
            row.insertCell(2).textContent = price.toFixed(2);
        }

        document.getElementById('totalPrice').textContent = total.toFixed(2);
    } else {
        console.error('Order or item names not found in localStorage.');
    }
}

// Process the payment
function processPayment() {
    var isValid = form.checkValidity();

    if (isValid) {
        var today = new Date();
        var deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2);

        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = deliveryDate.toLocaleDateString('en-US', options);

        document.getElementById('deliveryDate').textContent = formattedDate;
        document.getElementById('paymentForm').style.display = 'none';
        document.getElementById('orderSummary').style.display = 'none';
        document.getElementById('thankYouMessage').style.display = 'block';
    } else {
        alert('Please fill in all the required fields.');
    }
}

// Call the function to load the order summary when the page loads
document.addEventListener('DOMContentLoaded', loadOrderSummary);
