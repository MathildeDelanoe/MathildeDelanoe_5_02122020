// récupère l'ID passé dans l'URL
function getIdFromUrl()
{
    return location.search.substring(4);
}

// Cette fonction remplit la fiche produit de celui qui est sélectionné
function fillProductSheet(product)
{
    let image = document.querySelector("div.card img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", "Picture of " + product.name);
    let name = document.querySelector("div.card-body h3");
    name.innerHTML = product.name;
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
    console.log(response);
    fillProductSheet(response);
})
.catch(error => console.log("Erreur : " + error))