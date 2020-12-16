//Fonction pour afficher le panier
function showBasket()
{

    for (let i = 0; i < localStorage.length; i++)
    {
        let object = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let container = document.getElementsByClassName("container-fluid");
        let row = document.createElement("div");
        row.classList.add("row","border-bottom","border-secondary","align-items-center");
        let firstColumn = document.createElement("div");
        firstColumn.classList.add("col","text-center");

        let image = document.createElement("img");
        image.setAttribute("src", object.image);
        image.setAttribute("alt", "Picture of " + object.name);
        container[0].appendChild(row);
        row.appendChild(firstColumn);
        firstColumn.appendChild(image);

        let secondColumn = document.createElement("div");
        secondColumn.classList.add("col");
        let name = document.createElement("h3");
        name.innerHTML = object.name;
        name.classList.add("font-weight-bold");
        name.setAttribute("style", "font-size:1.2em");
        let selection = document.createElement("p");
        selection.innerHTML = "Couleur : " + object.selection;
        let price = document.createElement("p");
        price.classList.add("text-right","font-weight-bold");
        price.innerHTML = priceToEuros(object.price);
        row.appendChild(secondColumn);
        secondColumn.appendChild(name);
        secondColumn.appendChild(selection);
        secondColumn.appendChild(price);
    }
  
}
 



// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments a l'ouverture de la page
printBasketInfo();

//Appel la fonction qui affiche le panier
showBasket();