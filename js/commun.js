/* Cette fonction a pour but de traduire un prix en centimes (valeur numerique)
en chaine de caractere qui represente le prix en euro
Exemple : 1500 devient 15.00€ */
function priceToEuros(centsPrice)
{
    priceString = centsPrice.toString();
    return (priceString.substring(0, priceString.length-2)  + '.' + priceString.slice(-2) + "€");
}