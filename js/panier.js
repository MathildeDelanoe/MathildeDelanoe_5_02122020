let prices = [];


//Fonction pour afficher le panier
function showBasket()
{
    let container = document.getElementsByClassName("container-fluid");

    if (localStorage.length === 0)
    {
        let emptyBasket = document.createElement("p");
        emptyBasket.innerHTML = "Votre panier est vide";
        container[0].appendChild(emptyBasket);
        container[1].setAttribute("style", "display:none");
    }
    else
    {
        for (let i = 0; i < localStorage.length; i++)
        {
            let object = JSON.parse(localStorage.getItem(localStorage.key(i)));
            let row = document.createElement("div");
            row.classList.add("row","border-bottom","border-secondary","align-items-center");
            let firstColumn = document.createElement("div");
            firstColumn.classList.add("col","text-center");

            let image = document.createElement("img");
            image.setAttribute("src", object.image);
            image.setAttribute("alt", "Picture of " + object.name);
            container[0].appendChild(row);
            row.appendChild(firstColumn);
            firstColumn.appendChild(image);

            let secondColumn = document.createElement("div");
            secondColumn.classList.add("col");
            let name = document.createElement("h3");
            name.innerHTML = object.name;
            name.classList.add("font-weight-bold");
            name.setAttribute("style", "font-size:1.2em");
            let selection = document.createElement("p");
            selection.innerHTML = "Couleur : " + object.selection;
            let quantity = document.createElement("input");
            quantity.setAttribute("type", "number");
            quantity.setAttribute("min", "1");
            quantity.setAttribute("value", object.quantity);
            quantity.setAttribute("style", "width:5em");
            let price = document.createElement("p");
            price.classList.add("price", "text-right","font-weight-bold");
            let productPrice = object.quantity*object.price;
            price.innerHTML = priceToEuros(productPrice);
            prices.push(productPrice);
            row.appendChild(secondColumn);
            secondColumn.appendChild(name);
            secondColumn.appendChild(selection);
            secondColumn.appendChild(quantity);
            secondColumn.appendChild(price);
        }

        let total = document.createElement("div");
        total.classList.add("row");
        let firstColumn = document.createElement("div");
        firstColumn.classList.add("col","col-8");
        let secondColumn = document.createElement("div");
        secondColumn.classList.add("col","col-4");

        container[0].appendChild(total);
        total.appendChild(firstColumn);
        total.appendChild(secondColumn);

        let lineTotal = document.createElement("p");
        lineTotal.innerHTML = "Prix total de la commande : " ;
        lineTotal.classList.add("font-weight-bold");
        lineTotal.setAttribute("style", "font-size:1.1em");
        let totalPrice = document.createElement("p");
        totalPrice.innerHTML = priceToEuros(calculateTotalAmount(prices));
        totalPrice.classList.add("totalPrice", "font-weight-bold","text-right");
        totalPrice.setAttribute("style", "font-size:1.1em");

        firstColumn.appendChild(lineTotal);
        secondColumn.appendChild(totalPrice);
    }
}

// Fonction qui met a jour la quantite du produit dans le panier (localStorage)
function updateBasketWithQuantity(indexObject, newQuantity)
{
    let object = JSON.parse(localStorage.getItem(localStorage.key(indexObject)));
    object.quantity = newQuantity;
    localStorage.setItem(localStorage.key(indexObject), JSON.stringify(object));
}

function isValidData(data, errorMessage)
{
    return new Promise(function(resolve, reject)
    {
        if(data.checkValidity())
        {
            resolve(true);
        }
        else
        {
            reject(errorMessage);
        }
    });
}

function activateSubmitButton()
{
    Promise.all([isValidData(firstNameInput, "Prénom incorrect"),
                 isValidData(lastNameInput, "Nom incorrect"),
                 isValidData(addressInput, "Adresse incorrecte"),
                 isValidData(cityInput, "Ville incorrecte"),
                 isValidData(emailInput, "Email incorrect")])
    .then(function()
        {
            submitButton.disabled = false;
        })
    .catch(function(error)
        {
            submitButton.disabled = true;
        });
}

// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments a l'ouverture de la page
printBasketInfo();

// Appel la fonction qui affiche le panier
showBasket();

// Gestion de la quantité de produits et mise à jour du prix
let quantityButtons = document.querySelectorAll("#panier_recap input");
for (let index = 0; index < quantityButtons.length; index++)
{
    quantityButtons[index].addEventListener("change", function(event)
    {
        let object = JSON.parse(localStorage.getItem(localStorage.key(index)));
        // Changement du prix du produit
        let currentPrice = document.querySelectorAll("p.price");
        let newPrice = object.price * event.target.value;
        currentPrice[index].innerHTML = priceToEuros(newPrice);
        // Changement du prix total de la commande
        prices[index] = newPrice;
        let totalPrice = document.getElementsByClassName("totalPrice");
        totalPrice[0].innerHTML = priceToEuros(calculateTotalAmount(prices));
        // Mise à jour de la quantité dans le local storage
        updateBasketWithQuantity(index, event.target.value);
    })
}

// Formulaire
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let addressInput = document.getElementById("address");
let cityInput = document.getElementById("city");
let emailInput = document.getElementById("email");

let submitButton = document.getElementById("submitButton");

firstNameInput.addEventListener('change', function(){
    activateSubmitButton()}
    );
lastNameInput.addEventListener('change', function(){
    activateSubmitButton()}
    );
addressInput.addEventListener('change', function(){
    activateSubmitButton()}
    );
cityInput.addEventListener('change', function(){
    activateSubmitButton()}
    );
emailInput.addEventListener('change', function(){
    activateSubmitButton()}
    );

// Gestion du clic sur le bouton "Envoyer"
submitButton.addEventListener('click', function()
{
    let contact = {
        firstName : firstNameInput.value,
        lastName : lastNameInput.value,
        address : addressInput.value,
        city : cityInput.value,
        email : emailInput.value
    };
    localStorage.setItem("personalData", JSON.stringify(contact));
    window.location = 'confirmation.html';
});