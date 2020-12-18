// récupère l'ID passé dans l'URL
function getIdFromUrl()
{
    return location.search.substring(4);
}

// Cette fonction remplit la fiche produit de celui qui est sélectionné
function fillProductSheet(product)
{
    let card = document.querySelector("div.card");
    let image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", "Picture of " + product.name);
    card.insertBefore(image, card.firstChild);
    let cardBody = document.querySelector("div.card-body");
    let name = document.createElement("h3");
    name.innerHTML = product.name;
    name.classList.add("card-title");
    cardBody.insertBefore(name, cardBody.firstChild);
    let description = document.querySelector("div.card-body p.card-text");
    description.innerHTML = product.description;
    let selection = document.getElementById("colorSelection");
    for (let color of product.colors)
    {
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerHTML = color;
        selection.appendChild(option);
    }
    let price = document.querySelector("div.card-body p.price");
    price.innerHTML = priceToEuros(product.price);
}

// Cette fonction ajoute l'élément selectionné au panier
function addToBasket()
{
    let objectToBasket = {
        id : getIdFromUrl(),
        name : document.querySelector("div.card-body h3").innerHTML,
        selection : document.getElementById("colorSelection").value,
        price : priceToCentsString(document.querySelector("div.card-body p.price").innerHTML),
        image : document.querySelector("div.card img").getAttribute("src"),
        quantity: 1
    };
    localStorage.setItem("object" + (localStorage.length + 1), JSON.stringify(objectToBasket));
}

function printChoice(){
    let page = document.getElementsByClassName("container-fluid");
    page[0].setAttribute("style", "opacity:0.5");
    let question = document.getElementById("apresPanier");
    question.setAttribute("style", "opacity:1");
}

// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments a l'ouverture de la page
printBasketInfo();

// Envoi de la requete get au serveur
fetchApi("http://localhost:3000/api/teddies/" + getIdFromUrl(), [], fillProductSheet);


//Ecoute du clic sur le bouton d'ajout au panier
let personalisation = document.getElementById("colorSelection");
const btn = document.querySelector("div.card-body button");
btn.addEventListener("click", function(event)
{
    if (personalisation.value === "")
    {
        alert("Personnalisation non selectionnée");
        event.preventDefault();
    }
    else
    {
        addToBasket();
        printBasketInfo(); // Remet a jour le panier en haut a droite
        printChoice();
    }
}
);

