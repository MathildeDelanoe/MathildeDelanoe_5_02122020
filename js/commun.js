/* Cette fonction a pour but de traduire un prix en centimes (valeur numerique)
   en chaine de caractere qui represente le prix en euro
   Paramètres:
        - centsPrice : valeur décimale exprimée en centimes. Exemple : 2900
   Retourne:
        une chaîne de caractères. Exemple : 29.00€
*/
function priceToEuros(centsPrice)
{
    priceString = centsPrice.toString(); // Transformation en chaîne de caractère de la valeur décimale
    /* Renvoie une chaîne de caractères à laquelle on ajoute :
        - un '.' pour séparer les unités et les centimes 
        - la devise à la fin
    */
    return (priceString.substring(0, priceString.length-2)  + '.' + priceString.slice(-2) + "€");
}

/* Cette fonction a pour but de traduire une chaîne de caractères représentant une devise
   en sa valeur décimale
   Paramètres:
        - stringPrice : chaîne de caractères. Exemple : 29.00€
   Retourne:
        une valeur décimale. Exemple : 2900
*/
function priceToCentsString(stringPrice)
{
    /*
        - Supprime la devise finale
        - Transforme en décimal
        - Multiplie par 100 pour obtenir une valeur en centimes
    */
    return Number(stringPrice.slice(0, -1)) * 100;
}

/* Cette fonction récupère le nombre d'éléments du localStorage pour afficher
 la quantité d'article dans le panier */
function printBasketQuantity()
{
    // Sélection de l'élément html dans lequel sera écrit la quantité du panier
    let circleInfo = document.querySelector("ul.navbar-nav li p");
    
    // Initialisation du compteur de produits
    let quantities = 0;

    // Récupère les objets du panier au format Javascript grâce à JSON.parse
    let objectsFromBasket = JSON.parse(localStorage.getItem("object"));
    if (objectsFromBasket != null)
    {
        // Si le panier n'est pas vide, on parcourt les éléments et on accumule les quantités
        for (let product of objectsFromBasket)
        {
            quantities += product.quantity;
        }
    }
    
    // Attribution de la quantité à l'élément html
    circleInfo.innerHTML = quantities.toString();
}

/* Cette fonction calcule la somme du tableau passé en paramètre
   Paramètres:
        - tableOfPrice : tableaux de valeurs décimales
   Retourne:
        La somme de tous les éléments du tableau
*/
function calculateTotalAmount(tableOfPrice)
{
    let sum = 0; // Initialisation de la variable stockant la somme du tableau
    for (let price of tableOfPrice)
    {
        sum += price; // Accumulation des prix
    }
    return sum;
}

/* Interrogation du serveur via une requete HTTP en utilisant l'API fetch
   Paramètres:
        - url : url à atteindre via la requête HTTP
        - options : liste d'options de la méthode fetch, notamment pour sélectionner la méthode POST
        - callback : fonction callback qui est appelée lorsque toutes les promesses sont résolues et que la réponse de la requête est prête
*/
function fetchApi (url, options, callback)
{
    fetch(url, options)
    .then(function(response)
    {
        if (response.ok && (response.status >= 200 && response.status <= 299))
        {
            return response.json(); // Gestion des bons cas seulement si le code est entre 200 et 299
        }
        else
        {
            // S'il y a une erreur, écriture d'un message correspondant à l'erreur
            let message = [];
            if (response.status >= 300 && response.status <= 399)
            {
                message = 'Erreur de redirection. Le contenu a bougé ou n\'est pas accessible directement';
            }
            else if (response.status >= 400 && response.status <= 499)
            {
                message = 'Erreur liée à l\'utilisation du service web';
            }
            else if (response.status >= 500 && response.status <= 599)
            {
                message = 'Erreur venant du service web';
            }
            else
            {
                message = 'Erreur d\'un autre type';
            }
            throw new Error(message);
        }
    })
    .then(function(response)
    {
        callback(response);
    })
    .catch(error => alert(error))
}