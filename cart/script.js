if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    document.getElementById('cartnumber').innerText = '0'
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    cartNumber_0();
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
    
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartnumber_add()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}



// IMAGE ZOOM

// var image_zoomer_container = document.getElementsByClassName("shop-item");
// const image_zoomer_img = document.getElementsByClassName("shop-item-image")
// for (var i = 0; i < image_zoomer_container.length; i++){
//     image_zoomer_container_a=image_zoomer_container[i]
//     const image_zoomer_img_i=image_zoomer_img[i]
//     image_zoomer_container_a.addEventListener("mousemove",perform_zoom)
//     image_zoomer_container_a.addEventListener("mouseleave",perform_zoom_out)
// }



// function perform_zoom(e) {
//     const x=e.clientX - e.target.offsetLeft;
//     const y=e.clientY - e.target.offsetTop;
//     const image_zoomer_img = document.getElementsByClassName("shop-item-image")[0]
//     // for (var i = 0; i < image_zoomer_img.length; i++){
    
//     //     var image_zoomer_img_i=image_zoomer_img[i];
//     image_zoomer_img_i.style.transformOrigin = `${x}px ${y}px`;

//     image_zoomer_img_i.style.transform = "scale(2)";
//     // }
// };

// function perform_zoom_out(){
//     const image_zoomer_img = document.getElementsByClassName("shop-item-image")[0]
//     // for (var i = 0; i < image_zoomer_img.length; i++){
//     //     var image_zoomer_img_i=image_zoomer_img[0];
//     image_zoomer_img_i.style.transformOrigin = "center center";
//     image_zoomer_img_i.style.transform = "scale(1)";
//     // }
// };



// TOAST

var toast_messege_addtocart = document.getElementsByClassName("shop-item-button")
const container = document.getElementsByClassName("shop-item-details")
for (var i=0;i<toast_messege_addtocart.length;i++){
    var toast_messege_addtocart_i = toast_messege_addtocart[i]

    const container_i=container[i]

    toast_messege_addtocart_i .addEventListener("click", () => {
    createnotification();
})

function createnotification(){
    const notif = document.createElement('div');
    notif.classList.add('cart-price');

    notif.innerText = "Added to cart";

    
    // for (var i=0;i<container.length;i++){
    //    const container_i=container[i]
    container_i.append(notif);
    setTimeout(() => {
        notif.remove();
    },1000);

    }
    // setTimeout(() => {
    //     notif.remove();
    // },1000);

}


const btn = document.getElementById("img");
const nav = document.getElementById("cart-sidebar")

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
    console.log('items in the cart')
    
});


function cartnumber_add(){
    var cartnumber_before=document.getElementById('cartnumber').innerText;
    cartnumber_before++;
    console.log(cartnumber_before)
    document.getElementById('cartnumber').innerHTML = cartnumber_before;
}

function cartNumber_0(){
    var cartnumber_before=document.getElementById('cartnumber').innerText;
    var cartnumber_after=cartnumber_before-1;
    console.log(cartnumber_after);
    document.getElementById('cartnumber').innerHTML = cartnumber_after;
}