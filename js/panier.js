let prices = [];

function calculateTotalAmount(tableOfPrice)
{
    let sum = 0;
    for (let price of tableOfPrice)
    {
        
        sum += price;
    }
    return sum;
}

//Fonction pour afficher le panier
function showBasket()
{
    let container = document.getElementsByClassName("container-fluid");

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
        let price = document.createElement("p");
        price.classList.add("text-right","font-weight-bold");
        price.innerHTML = priceToEuros(object.price);
        prices.push(object.price);
        row.appendChild(secondColumn);
        secondColumn.appendChild(name);
        secondColumn.appendChild(selection);
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
    totalPrice.classList.add("font-weight-bold","text-right");
    totalPrice.setAttribute("style", "font-size:1.1em");

    firstColumn.appendChild(lineTotal);
    secondColumn.appendChild(totalPrice);
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

//Appel la fonction qui affiche le panier
showBasket();


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