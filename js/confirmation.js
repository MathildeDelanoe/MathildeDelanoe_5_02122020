// Affiche un récapitulatif du panier
function printBasketSummary()
{
    // Création d'une section 
    let section = document.getElementsByTagName("section");

    // Création d'un tableau pour le récapitulatif de la commande
    let table = document.createElement("table");
    table.setAttribute("style", "width:40%");
    table.classList.add("mx-auto","mb-5");

    // Création de l'élément "caption" pour créer le titre du tableau
    let title = document.createElement("caption");
    title.innerHTML = "Récapitulatif : ";
    title.setAttribute("style", "caption-side:top; font-size:1.5em");
    title.classList.add("text-dark","font-weight-bold");

    // Création de l'en-tête du tableau
    let thead = document.createElement("thead");
    let lineTitle = document.createElement("tr");
    let nameHeader = document.createElement("th");
    nameHeader.innerHTML = "Nom du produit";
    nameHeader.classList.add("border","border-dark","text-center");
    let colorHeader = document.createElement("th");
    colorHeader.innerHTML = "Couleur";
    colorHeader.classList.add("border","border-dark","text-center");
    let quantityHeader = document.createElement("th");
    quantityHeader.innerHTML = "Quantité";
    quantityHeader.classList.add("border","border-dark","text-center");
    let priceHeader = document.createElement("th");
    priceHeader.innerHTML = "Prix";
    priceHeader.classList.add("border","border-dark","text-center");

    // Création du pied du tableau
    let tfoot = document.createElement("tfoot");
    let totalPriceLine = document.createElement("tr");
    let totalPriceDescription = document.createElement("th");
    totalPriceDescription.innerHTML = "Prix total : ";
    totalPriceDescription.classList.add("text-right");
    totalPriceDescription.setAttribute("colspan", "3");
    let totalPriceAmount = document.createElement("th");
    totalPriceAmount.classList.add("text-center");
    let tbody = document.createElement("tbody");

    let amounts = [];

    let objectsFromBasket = JSON.parse(localStorage.getItem("object"));

    // Création et affichage de chaque article du panier
    for (let product of objectsFromBasket)
    {
        let line = document.createElement("tr");
        let colName = document.createElement("td");
        colName.classList.add("border","border-dark");
        colName.innerHTML = product.name;
        let colColor = document.createElement("td");
        colColor.classList.add("border","border-dark");
        colColor.innerHTML = product.selection;
        let colQuantity = document.createElement("td");
        colQuantity.classList.add("border","border-dark","text-center");
        colQuantity.innerHTML = product.quantity;
        let colPrice = document.createElement("td");
        colPrice.classList.add("border","border-dark","text-center");
        let productPrice = product.price * product.quantity;
        colPrice.innerHTML = priceToEuros(productPrice);
        amounts.push(productPrice);

        // Insertion dans le DOM
        tbody.appendChild(line);
        line.appendChild(colName);
        line.appendChild(colColor);
        line.appendChild(colQuantity);
        line.appendChild(colPrice);
    }
    
    totalPriceAmount.innerHTML = priceToEuros(calculateTotalAmount(amounts));

    // Construction de la table
    section[0].appendChild(table);
    table.appendChild(title);
    table.appendChild(thead);
    thead.appendChild(lineTitle);
    lineTitle.appendChild(nameHeader);
    lineTitle.appendChild(colorHeader);
    lineTitle.appendChild(quantityHeader);
    lineTitle.appendChild(priceHeader);
    table.appendChild(tfoot);
    tfoot.appendChild(totalPriceLine);
    totalPriceLine.appendChild(totalPriceDescription);
    totalPriceLine.appendChild(totalPriceAmount);
    table.appendChild(tbody);
}

/* Affiche un résumé du panier ainsi que le message de confirmation
   Paramètres:
        - response : Réponse provenant de la requête post
*/
function fillConfirmationMessage(response)
{
    // Appel de la fonction qui affiche le récapitulatif du panier
    printBasketSummary();

    let section = document.getElementsByTagName("section");
    let commandNumberTitle = document.createElement("h2");
    commandNumberTitle.classList.add("text-center","pb-3");
    commandNumberTitle.innerHTML = "Votre commande est validée sous la référence n° " + response.orderId + ".";
    section[0].appendChild(commandNumberTitle);

    let finalWord = document.createElement("h3");
    finalWord.classList.add("text-center","font-weight-bold","my-5");
    finalWord.innerHTML = "Merci pour votre commande.";
    section[0].appendChild(finalWord);

    // Suppression du panier via nettoyage du localStorage
    localStorage.clear();
    printBasketQuantity(); // Besoin pour mettre à jour la valeur du panier en haut à droite
}

// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments
printBasketQuantity();

// Création des éléments de la requête post
let contact = {};
let products = [];

// Récupération des produits du panier
let objectsFromBasket = JSON.parse(localStorage.getItem("object"));
for (let product of objectsFromBasket)
{
    // Remplissage du tableau d'id des produits
    products.push(product.id);
}
// Récupération des informations de contact renseignées dans le formulaire précédemment rempli
contact = JSON.parse(localStorage.getItem("personalData"));

// Initialisation des options de la méthode fetch
let options = 
{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact, products}) // Remplissage du body de la requête avec les informations nécessaires
};

// Envoi de la requête post au serveur
fetchApi("http://localhost:3000/api/teddies/order/", options, fillConfirmationMessage);
