const PRODUCTS_NUMBER_PER_ROW = 3;
const BOOTSTRAP_COLUMNS_NUMBER = 12;
const BOOTSTRAP_COLUMNS_PER_PRODUCT = BOOTSTRAP_COLUMNS_NUMBER / PRODUCTS_NUMBER_PER_ROW;

function addToCatalogue(product)
{
    let column = document.createElement("div");
    // Creation de la colonne avec une classe "col" + elements responsives + margin
    column.classList.add("col", "col-12", "col-lg-" + BOOTSTRAP_COLUMNS_PER_PRODUCT, "my-2");
    let card = document.createElement("div");
    card.classList.add("card"); // Creation de la colonne avec une classe "card"
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top"); // Creation de la colonne avec une classe "card-img-top"
    cardImg.setAttribute("src", product.imageUrl);
    cardImg.setAttribute("alt", "Picture of " + product.name);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body"); // Creation de la colonne avec une classe "card-body"
    let productName = document.createElement("h3");
    productName.classList.add("card-title");
    productName.innerHTML = product.name;
    let productDescription = document.createElement("p");
    productDescription.classList.add("card-text");
    productDescription.innerHTML = product.description;
    let productPrice= document.createElement("p");
    productPrice.classList.add("text-right","font-weight-bold");
    productPrice.innerHTML = priceToEuros(product.price);

    column.appendChild(card);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(productName);
    cardBody.appendChild(productDescription);
    cardBody.appendChild(productPrice);
    return column;
}

function fillCatalogue(productsTable)
{
    let container = document.querySelector("div.container-fluid");
    let productsCounter = 0;
    for (let product of productsTable)
    {
        if ((productsCounter % PRODUCTS_NUMBER_PER_ROW) === 0)
        {
            var currentRow = document.createElement("div");
            currentRow.classList.add("row"); // Creation de la ligne avec une classe "row"
            container.appendChild(currentRow); // Ajout de la ligne au container
        }
        let currentColumn = addToCatalogue(product);
        currentRow.appendChild(currentColumn);
        productsCounter++;
    }
}

// Interrogation du serveur via une requete HTTP en utilisant l'API fetch
fetch("http://localhost:3000/api/teddies/")
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
    fillCatalogue(response);
})
.catch(error => console.log("Erreur : " + error))