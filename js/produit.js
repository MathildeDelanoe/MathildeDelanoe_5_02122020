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
        image : document.querySelector("div.card img").getAttribute("src")
    };
    localStorage.setItem("objet" + (localStorage.length + 1), JSON.stringify(objectToBasket));
}

printBasketInfo();

// Interrogation du serveur via une requete HTTP en utilisant l'API fetch
fetch("http://localhost:3000/api/teddies/" + getIdFromUrl())
.then(function(response)
{
    if (response.ok && (response.status >= 200 && response.status <= 299))
    {
        return response.json(); // Gestion des bons cas seulement si le code est entre 200 et 299
    }
    else
    {
        throw new Error('error');
    }
})
.then(function(response)
{
    fillProductSheet(response);
})
.catch(error => console.log("Erreur : " + error))

//Ecoute du clic sur le bouton d'ajout au panier
const btn = document.querySelector("div.card-body button");
btn.addEventListener("click", function()
{
    addToBasket();
    printBasketInfo();
});
