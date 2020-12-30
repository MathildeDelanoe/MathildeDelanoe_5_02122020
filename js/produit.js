// Récupère l'ID passé dans l'URL
function getIdFromUrl()
{
    // location.search renvoie la partie de l'url qui suit le '?' en l'incluant
    return location.search.substring(4);
}

/* Remplit la fiche produit
   Paramètres:
        - product : Contient les éléments du produit tel que transmis par le serveur
*/
function fillProductSheet(product)
{
    // Sélection de la "div" avec une classe "card"
    let card = document.querySelector("div.card");

    // Création de l'image du produit
    let image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", "Picture of " + product.name);
    card.insertBefore(image, card.firstChild);

    // Sélection de la "div" avec une classe "card-body"
    let cardBody = document.querySelector("div.card-body");

    // Création d'un titre h3
    let name = document.createElement("h3");
    name.innerHTML = product.name;
    name.classList.add("card-title");
    cardBody.insertBefore(name, cardBody.firstChild);

    /* Sélection du "p" avec une classe "card-text" de la "div" avec une classe "card-body" pour
    écrire la description */
    let description = document.querySelector("div.card-body p.card-text");
    description.innerHTML = product.description;

    // Sélection de l'élément 'select' pour personnaliser le produit
    let selection = document.getElementById("colorSelection");

    // Boucle qui parcourt les couleurs
    for (let color of product.colors)
    {
        // Ajout d'une option à la liste de sélections
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerHTML = color;
        selection.appendChild(option);
    }

    /* Selection du "p" avec une classe "price" de la "div" avec une classe "card-body" pour
    écrire le prix */
    let price = document.querySelector("div.card-body p.price");
    price.innerHTML = priceToEuros(product.price);
}

// Cette fonction ajoute l'élément selectionné au panier
function addToBasket()
{
    // Création de l'objet Javascript à insérer dans le panier (localStorage)
    let objectToBasket = {
        id : getIdFromUrl(),
        name : document.querySelector("div.card-body h3").innerHTML,
        selection : document.getElementById("colorSelection").value,
        price : priceToCentsString(document.querySelector("div.card-body p.price").innerHTML),
        image : document.querySelector("div.card img").getAttribute("src"),
        quantity: 1
    };

    // Récupération de la clé object du localStorage
    let objectContent = JSON.parse(localStorage.getItem("object"));
    if (objectContent == null)
    {
        // Ceci est le premier objet à ajouter au panier
        let objects = [objectToBasket]; // Ajout du produit au tableau de produits
        localStorage.setItem("object", JSON.stringify(objects)); // Enregistrement dans le LS
    }
    else
    {
        // Ici, nous avons un ou des objets dans le panier
        objectContent.push(objectToBasket); // Ajout du produit à la fin du tableau de produits
        localStorage.setItem("object", JSON.stringify(objectContent)); // Enregistrement dans le LS
    }
}

/* Cette fonction permet de rendre visible la question qui demande à l'utilisateur
   ce qu'il souhaite faire après l'ajout au panier */
function printChoice()
{
    let page = document.getElementsByClassName("container-fluid");
    page[0].setAttribute("style", "opacity:0.5"); // Rendre opaque la partie principale
    let question = document.getElementById("choiceBox");
    question.setAttribute("style", "opacity:1"); // Rendre visible la question
}

// Fonction qui permet d'écouter le clic sur le bouton d'ajout au panier
function manageBasketAdd()
{
    let personalisation = document.getElementById("colorSelection");
    const btn = document.querySelector("div.card-body button");
    btn.addEventListener("click", function()
    {
        // Vérification d'une saisie de la personnalisation
        if (personalisation.value === "")
        {
            alert("Personnalisation non selectionnée");
        }
        else
        {
            addToBasket(); // Ajoute le produit au panier
            printBasketQuantity(); // Remet à jour la quantité dans le panier en haut à droite
            window.location.href = '#header';
            printChoice(); // Affichage de la question sur la suite des achats
        }
    });
}

// Fonction qui permet d'écouter le clic du bouton de retour vers le catalogue
function manageContinueShopping()
{
    let continueShopping = document.getElementById("continueShopping");
    continueShopping.addEventListener('click', function() {
        window.location = 'index.html'; // Au clic, la page index.html s'ouvre
    });
}

// Fonction qui permet d'écouter le clic du bouton de direction vers le panier
function manageSeeBasket()
{
    let seeBasket = document.getElementById("seeBasket");
    seeBasket.addEventListener('click', function() {
        window.location = 'panier.html'; // Au clic, la page panier.html s'ouvre
    });
}


// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments
printBasketQuantity();

// Envoi de la requete get au serveur
fetchApi("http://localhost:3000/api/teddies/" + getIdFromUrl(), [], fillProductSheet);

// Appel la fonction pour écouter les événements du bouton d'ajout au panier
manageBasketAdd();

// Appel la fonction pour écouter les événements sur le retour vers le catalogue
manageContinueShopping();

// Appel la fonction pour écouter les événements sur la redirection vers le panier
manageSeeBasket();



