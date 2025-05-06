let cart = {};
try {
    cart = JSON.parse(localStorage.getItem('cart')) || {};
} catch (e) {
    console.error("Error parsing cart data:", e);
    cart = {};
}

$(document).on('click', '.atc', function () {
    const item_id = this.id.toString();
    const itemName = document.getElementById("nm" + item_id)?.innerText || "Product " + item_id;
    const itemPrice = parseFloat(document.getElementById("price" + item_id)?.innerText.replace('$', '')) || 0;

    if (cart[item_id]) {
        if (typeof cart[item_id] === 'object') {
            cart[item_id].quantity += 1;
        } else {
            cart[item_id] = {
                name: itemName,
                price: itemPrice,
                quantity: cart[item_id] + 1
            };
        }
    } else {
        cart[item_id] = {
            name: itemName,
            price: itemPrice,
            quantity: 1
        };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
});

function updateCartDisplay() {
    const cartButton = document.getElementById("cart");
    if (!cartButton) return;

    const itemCount = Object.keys(cart).length;
    cartButton.innerHTML = `Cart(${itemCount})`;

    let popoverContent = '<div style="min-width: 250px">';

    if (itemCount > 0) {
        popoverContent += '<h6 class="mb-2">🛒 Your Cart:</h6><ul class="list-group list-group-flush">';

        for (const [itemId, item] of Object.entries(cart)) {
            const name = item.name;
            const quantity = item.quantity;

            popoverContent += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${name}
                    <span class="badge bg-primary rounded-pill">${quantity}</span>
                </li>`;
        }

        popoverContent += '</ul>';
        popoverContent += `
            <div class="d-grid gap-2 mt-2">
                <a href="/checkout/" class="btn btn-warning btn-sm">Checkout</a>
            </div>`;
    } else {
        popoverContent += `
            <div class="text-center py-3 text-muted">
                <i class="bi bi-cart-x fs-4"></i>
                <p class="mb-0 mt-2">Your cart is empty</p>
            </div>`;
    }

    popoverContent += '</div>';

    const popover = bootstrap.Popover.getInstance(cartButton);
    if (popover) {
        popover.dispose();
    }

    new bootstrap.Popover(cartButton, {
        html: true,
        content: popoverContent,
        trigger: 'focus',
        placement: 'bottom'
    });
}

$(document).ready(function () {
    updateCartDisplay();

    let total = 0;
    for (const item in cart) {
        const name = cart[item].name;
        const quantity = cart[item].quantity;
        const price = cart[item].price || 0;
        const itemTotal = quantity * price;
        total += itemTotal;

 const itemString = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <span class="badge bg-success rounded-pill">${quantity}</span> X ${name}
                <span class="badge bg-warning rounded-pill">$${price.toFixed(2)}</span> = 
                <span class="badge bg-danger rounded-pill">$${itemTotal.toFixed(2)}</span>
            </div>
            <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item}">
                <i class="bi bi-trash"></i> Remove
            </button>
        </li>`;        
        $('#item_list').append(itemString);
    }
    $(document).on('click', '.remove-item', function() {
        const itemId = $(this).data('id');
        delete cart[itemId];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        location.reload();
    });
    if (total > 0) {
        $('#item_list').append(`<li class="list-group-item bg-dark text-white">Total: $${total.toFixed(2)}</li>`);
    }
    $('#total').val(total);
    $('#items').val(JSON.stringify(cart));
});
