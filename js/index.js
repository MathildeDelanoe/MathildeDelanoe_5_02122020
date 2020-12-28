const PRODUCTS_NUMBER_PER_ROW = 3; // Nombre de produits par ligne du catalogue
const BOOTSTRAP_COLUMNS_NUMBER = 12; // Nombre de colonnes Bootstrap
const BOOTSTRAP_COLUMNS_PER_PRODUCT = BOOTSTRAP_COLUMNS_NUMBER / PRODUCTS_NUMBER_PER_ROW; // Nombre de colonnes utilisées pour chaque produit

/* Crée la fiche produit
   Paramètres:
        - product : Contient les éléments du produit tel que transmis par le serveur
*/
function createProductCard(product)
{
    // Creation de la colonne avec une classe "col" + elements responsives + margin
    let column = document.createElement("div");
    column.classList.add("col", "col-12", "col-lg-" + BOOTSTRAP_COLUMNS_PER_PRODUCT, "my-2");

    // Création de la carte du produit. La carte est composée d'une image, d'un titre, d'une description et d'un prix
    let card = document.createElement("div");
    card.classList.add("card"); // Creation de la colonne avec une classe "card"

    // Création de l'image du produit
    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", product.imageUrl);
    cardImg.setAttribute("alt", "Picture of " + product.name);

    // Création du corps de la carte qui contient les autres éléments
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body"); // Creation de la colonne avec une classe "card-body"

    // Création du titre qui contient le nom de l'article
    let productName = document.createElement("h3");
    productName.classList.add("card-title");
    productName.innerHTML = product.name;

    // Création du paragraphe qui contient la description du produit
    let productDescription = document.createElement("p");
    productDescription.classList.add("card-text");
    productDescription.innerHTML = product.description;

    // Création du paragraphe qui contient le prix du produit
    let productPrice= document.createElement("p");
    productPrice.classList.add("text-right","font-weight-bold");
    productPrice.innerHTML = priceToEuros(product.price); // Affichage du prix en chaine de caractères en euros

    // Création du lien sur la globalité de la carte
    let cardLink = document.createElement("a");
    cardLink.classList.add("stretched-link");
    cardLink.setAttribute("href", "produit.html?id=" + product._id); // Utilisation de paramètres dans l'url

    column.appendChild(card);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productDescription);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(cardLink);
    
    return column;
}

/* Affiche le catalogue avec les articles présents sur le serveur. Cette fonction est appelées dès que l'API
   fetch a terminé de traiter la requête.
   Paramètres:
        - productsTable : Tableau des produits présents sur le serveur. Ce tableau nous a été fourni
            par la requête HTTP précédemment lancée.
*/
function fillCatalogue(productsTable)
{
    let container = document.querySelector("div.container-fluid"); // Récupération de la "div" à remplir
    let productsCounter = 0; // Initialisation du nombre de produits

    // Parcours du tableau de produits
    for (let product of productsTable)
    {
        /* Cette condition if gère le passage à la ligne dans le catalogue. Lorsque le nombre de produits déjà affiché
        correspond au nombre souhaité, une nouvelle ligne est créée dans le catalogue. */
        if ((productsCounter % PRODUCTS_NUMBER_PER_ROW) === 0)
        {
            var currentRow = document.createElement("div");
            currentRow.classList.add("row"); // Creation de la ligne avec une classe "row"
            container.appendChild(currentRow); // Ajout de la ligne au container
        }
        let currentColumn = createProductCard(product); // Remplissage de la colonne avec un produit
        currentRow.appendChild(currentColumn); // Ajout de la colonne courante à la ligne
        productsCounter++;
    }

    let allRows = document.querySelectorAll("div.container-fluid div.row"); // Récupération de toutes les lignes du catalogue
    allRows[allRows.length-1].classList.add("mb-3"); // Ajouter une marge sur la derniere ligne
}

// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments
printBasketQuantity()

// Envoi de la requete get au serveur
fetchApi("http://localhost:3000/api/teddies/", [], fillCatalogue);