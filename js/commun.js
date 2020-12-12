/* Cette fonction a pour but de traduire un prix en centimes (valeur numerique)
en chaine de caractere qui represente le prix en euro
Exemple : 1500 devient 15.00€ */
function priceToEuros(centsPrice)
{
    priceString = centsPrice.toString();
    return (priceString.substring(0, priceString.length-2)  + '.' + priceString.slice(-2) + "€");
}

function priceToCentsString(stringPrice)
{
    return Number(stringPrice.slice(0, -1)) * 100;
}

/* Cette fonction récupère le nombre d'éléments du localStorage pour afficher
 la quantité d'article dans le panier */
function printBasketInfo()
{
    let div = document.querySelector("ul.navbar-nav li p");
    div.innerHTML = localStorage.length.toString();
}