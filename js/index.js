const PRODUCTS_NUMBER_PER_ROW = 3;
const BOOTSTRAP_COLUMNS_NUMBER = 12;
const BOOTSTRAP_COLUMNS_PER_PRODUCT = BOOTSTRAP_COLUMNS_NUMBER / PRODUCTS_NUMBER_PER_ROW;

function addToCatalogue(product)
{
    var createdColumn = document.createElement("div");
    createdColumn.classList.add("col"); // Creation de la colonne avec une classe "col"
    return createdColumn;
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