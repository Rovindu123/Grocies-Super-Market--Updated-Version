document.getElementById('addToTableButton').addEventListener('click', addToTable);
document.getElementById('saveToFavoritesButton').addEventListener('click', saveToFavorites);
document.getElementById('applyFavoritesButton').addEventListener('click', applyFavorites);
document.getElementById('buyNowButton').addEventListener('click', buyNow);

var form = document.getElementById('orderForm');
var tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
var totalPrice = document.getElementById('totalPrice');

// Prices for the items 
var pricesOfItems = {
    apple: 2060.00, banana: 240.00, orange: 1575.00, grapes: 573.00, pineapple: 1080.00, mango: 1340.00,
    carrot: 400.00, bigonions: 600.00, potato: 300.00, greenbeans: 200.00, cabbage: 400.00, brinjals: 240.00,
    milk: 435.00, cheese: 1790.00, butter: 1300.00, yogurt: 80.00, drinking_Yogurt: 180.00, Icecream: 1100.00,
    chicken: 1980.00, beef: 3130.00, fish: 680.00, shrimp: 2990.00,
    flour: 120.00, sugar: 420.00, salt: 120.00, bakingPowder: 380.00, oil: 1910.00, yeast: 495.00
};

// Item names corresponding to their IDs
var itemNames = {
    apple: "Apple", banana: "Banana", orange: "Orange", grapes: "Grapes", pineapple: "Pineapple (each)", mango: "Mango",
    carrot: "Carrot", bigonions: "Big Onions", potato: "Potato", greenbeans: "Green Beans", cabbage: "Cabbage", brinjals: "Brinjals",
    milk: "Kotmale Full Cream Chocolate (1L)", cheese: "Happy Cow Cheese Portion Regular (200g)", butter: "ANCHOR Butter Unsalted (227g)", yogurt: "KOTMALE Yoghurt Vanilla (90g)", drinking_Yogurt: "Kotmale Drinking Yoghurt Wood Apple (180ml)", Icecream: "Imorich French Vanilla (1L)",
    chicken: "Chicken Full Breast Skinless", beef: "Beef Cubes", fish: "Ocean Star Mackerel", shrimp: "Cleaned Shrimp Medium",
    flour: "Delish Corn Flour (400g)", sugar: "Brown Sugar Bulk", salt: "Link Iodised Table Salt (400g)", bakingPowder: "Motha Baking Powder (100g)", oil: "Baraka Virgin Coconut Oil (750ml)", yeast: "Mauripan Instant Dry Yeast (60g)"
};

// Function to add the selected items to the list
function addToTable() {
    tableBody.innerHTML = '';
    var total = 0;
    var orderSummary = {};

    for (var itemPrice in pricesOfItems) {
        var quantity = form[itemPrice].value;
        if (quantity && quantity > 0) {
            var price = pricesOfItems[itemPrice] * quantity;
            total += price;

            var row = tableBody.insertRow();
            row.insertCell(0).textContent = itemNames[itemPrice];
            row.insertCell(1).textContent = quantity;
            row.insertCell(2).textContent = price.toFixed(2);

            orderSummary[itemPrice] = {
                quantity: quantity,
                price: price
            };
        }
    }

    totalPrice.textContent = total.toFixed(2);
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    localStorage.setItem('itemNames', JSON.stringify(itemNames));
}

// Save selected items to a favorite list
function saveToFavorites() {
    var order = {};

    for (var itemPrice in pricesOfItems) {
        var quantity = form[itemPrice].value;
        if (quantity && quantity > 0) {
            order[itemPrice] = quantity;
        }
    }

    if (Object.keys(order).length > 0) {
        localStorage.setItem('favoriteOrder', JSON.stringify(order));
        alert('Your order is saved as favorite!');
    } else {
        alert("You don't pocess a favourite order list yet !");
    }
}

// Get the favorite items saved before and add them to the table
function applyFavorites() {
    var favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));

    if (favoriteOrder) {
        for (var itemPrice in favoriteOrder) {
            form[itemPrice].value = favoriteOrder[itemPrice];
        }
        addToTable();
    } else {
        alert('Favorite Order not found!');
    }
}

// Direct to the payment page after the button is clicked
function buyNow() {
    addToTable();
    window.location.href = 'payment.html';
}
