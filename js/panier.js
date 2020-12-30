// Création d'un tableau qui stockera le montant de chaque produit présent dans le panier
let prices = [];
// Création d'un tableau indiquant si le champ du formulaire est vide
let emptyFormParts = [false, false, false, false, false]; 

// Fonction affichant le panier
function showBasket()
{
    // Récupération des éléments HTML de classe container-fluid
    let container = document.getElementsByClassName("container-fluid");

    // Récupération du panier à partir du localStorage
    let objectsFromBasket = JSON.parse(localStorage.getItem("object"));
    if ((objectsFromBasket == null) || (objectsFromBasket.length === 0))
    {
        /* Ici, le panier est vide (déjà créé mais vidé au fur et à mesure par la croix de chaque article)
         ou inexistant (jamais créé) */
        // Création d'un titre h2 pour indiquer que le panier est vide 
        let emptyBasket = document.createElement("h2");
        emptyBasket.innerHTML = "Votre panier est vide";
        emptyBasket.classList.add("font-weight-bold","text-center",'mt-5');
        // Afficher le message de panier vide dans le premier container de la page
        container[0].appendChild(emptyBasket);
        // Le deuxième container de la page contient le formulaire qui n'est pas affiché dans ce cas
        container[1].setAttribute("style", "display:none");
    }
    else
    {
        // Dans ce cas, le tableau d'objets n'est pas vide dans le localStorage et nous le parcourons
        for (let product of objectsFromBasket)
        {
            // Création d'une ligne par produit
            let row = document.createElement("div");
            row.classList.add("row", "border-bottom", "border-secondary", "align-items-center", "px-2");
            
            // Création de la première colonne contenant l'image du produit et un lien retournant sur la page produit
            let firstColumn = document.createElement("div");
            firstColumn.classList.add("col","text-center");

            // Création du lien qui est sur l'image
            let productLink = document.createElement("a");
            productLink.setAttribute("href", "produit.html?id=" + product.id); // Création du lien pour retourner à la page produit
            
            // Création de l'élément pour l'image
            let image = document.createElement("img");
            image.setAttribute("src", product.image);
            image.setAttribute("alt", "Picture of " + product.name);
            // Insertion dans le DOM
            container[0].appendChild(row);
            row.appendChild(firstColumn);
            firstColumn.appendChild(productLink);
            productLink.appendChild(image);
            
            /* Création de la deuxième colonne contenant le nom, la personnalisation choisie, la quantité,
             le prix et la croix de suppression de l'article */
            let secondColumn = document.createElement("div");
            secondColumn.classList.add("col","position-relative");

            // Création d'un titre h3 pour le nom 
            let name = document.createElement("h3");
            name.innerHTML = product.name;
            name.classList.add("font-weight-bold");
            name.setAttribute("style", "font-size:1.2em");

            // Création d'un élément "p" pour la couleur
            let selection = document.createElement("p");
            selection.innerHTML = "Couleur : " + product.selection;

            // Création d'un élément "input" pour pouvoir augmenter la quantité
            let quantity = document.createElement("input");
            quantity.setAttribute("type", "number");
            quantity.setAttribute("min", "1");
            quantity.setAttribute("value", product.quantity);
            quantity.setAttribute("style", "width:5em");

            // Création d'un élément "p" pour le prix puis calcul du prix en fonction de la quantité
            let price = document.createElement("p");
            price.classList.add("price", "text-right","font-weight-bold");
            let productPrice = (product.quantity * product.price);
            price.innerHTML = priceToEuros(productPrice);
            prices.push(productPrice);

            // Création d'un élément "i" 
            let deleteCross = document.createElement("i");
            deleteCross.classList.add("fa","fa-times","position-absolute");
            deleteCross.setAttribute("style", "top:5px; right:0px;cursor:pointer");
            deleteCross.setAttribute("title","Supprimer l'article");

            // Insertion dans le DOM
            row.appendChild(secondColumn);
            secondColumn.appendChild(name);
            secondColumn.appendChild(selection);
            secondColumn.appendChild(quantity);
            secondColumn.appendChild(price);
            secondColumn.appendChild(deleteCross);
        }

        // Une fois tous les éléments du panier parcouru, nous calculons le prix total de la commande
        let total = document.createElement("div");
        total.classList.add("row");
        let firstColumn = document.createElement("div");
        firstColumn.classList.add("col","col-8");
        let secondColumn = document.createElement("div");
        secondColumn.classList.add("col","col-4");

        // Insertion dans le DOM
        container[0].appendChild(total);
        total.appendChild(firstColumn);
        total.appendChild(secondColumn);

        // Création d'un élement "p" pour indiquer le texte du prix total
        let lineTotal = document.createElement("p");
        lineTotal.innerHTML = "Prix total de la commande : " ;
        lineTotal.classList.add("font-weight-bold");
        lineTotal.setAttribute("style", "font-size:1.1em");
        //Création d'un élément "p" pour calculer le prix total de la commande
        let totalPrice = document.createElement("p");
        totalPrice.innerHTML = priceToEuros(calculateTotalAmount(prices));
        totalPrice.classList.add("totalPrice", "font-weight-bold","text-right");
        totalPrice.setAttribute("style", "font-size:1.1em");

        // Insertion dans le DOM
        firstColumn.appendChild(lineTotal);
        secondColumn.appendChild(totalPrice);
    }
}

/* Renvoie une promesse quant à l'exactitude de la donnée saisie dans le formulaire
   Paramètres:
        - data : donnée à valider
        - errorMessage : message d'erreur retourné par la promesse
        - index : index du champ à valider dans le formulaire
*/
function isValidData(data, errorMessage, index)
{
    return new Promise(function(resolve, reject)
    {
        // Pour résoudre ou rejeter la promesse, il faut vérifier la validité de la donnée saisie par l'utilisateur
        if(data.checkValidity())
        {
            // La donnée est correcte
            let divError = document.getElementById("errorMessage" + index.toString());
            let tdLastChild = document.querySelectorAll("td:last-child");
            if (divError != null)
            {
                // Récupération de tous les inputs du formulaire
                let input = document.querySelectorAll("#validationForm input");
                // Lorsqu'il n'y a plus d'erreur, suppression de l'ombre autour de l'input
                input[index].setAttribute("style", "box-shadow:none");
                tdLastChild[index].removeChild(divError);
            }
            let checkIcon = document.getElementById("check" + index.toString());
            if (checkIcon == null) // Aucune coche de validité n'est présente
            {
                let checkIcon = document.createElement("i");
                checkIcon.classList.add("fas", "fa-check", "position-absolute");
                checkIcon.setAttribute("style", "color: green; top: 50%; right: -20px; transform:translateY(-50%)");
                checkIcon.setAttribute("id", "check" + index);
                tdLastChild[index].appendChild(checkIcon);
            }
            resolve(true);
        }
        else
        {
            // Ici la donnée n'est pas valide mais a pu être éditée au moins une fois ou 0
            if (emptyFormParts[index])
            {
                // Ici la donnée a été éditée au moins une fois
                let tdLastChild = document.querySelectorAll("td:last-child"); // Récupération de toutes les dernières colonnes
                // Récupération de tous les inputs du formulaire
                let input = document.querySelectorAll("#validationForm input");
                // Lorsqu'il y a une erreur, affichage d'une ombre autour de l'input
                input[index].setAttribute("style", "box-shadow:0 0 5px red");
                // Gestion de l'affichage du message d'erreur
                let divError = document.getElementById("errorMessage" + index.toString());
                if (divError === null) // Aucun message n'est présent
                {
                    // Cette condition permet de ne pas écrire et superposer plusieurs fois le même message
                    let divError = document.createElement("div");
                    divError.setAttribute("id", "errorMessage" + index.toString());
                    let styleString = "position: absolute; color: red; bottom: 0px; left: 0px;";
                    divError.setAttribute("style", styleString);
                    divError.innerHTML = errorMessage;
                    tdLastChild[index].appendChild(divError);
                }
                // Suppression de la coche verte
                let checkIcon = document.getElementById("check" + index.toString());
                if (checkIcon != null) // Une coche de validité est présente
                {
                    tdLastChild[index].removeChild(checkIcon);
                }
            }
            reject(false);
        }
    });
}

/* Active le bouton d'envoi du formulaire
   Paramètres:
        - formInputs : Tableau de tous les champs du formulaire dont il faut valider la cohérence
*/
function activateSubmitButton(formInputs)
{
    Promise.all([isValidData(formInputs[0], "Prénom incorrect", 0),
                 isValidData(formInputs[1], "Nom incorrect", 1),
                 isValidData(formInputs[2], "Adresse incorrecte", 2),
                 isValidData(formInputs[3], "Ville incorrecte", 3),
                 isValidData(formInputs[4], "Email incorrect", 4)])
    .then(function()
        {
            submitButton.disabled = false;
        })
    .catch(function()
        {
            submitButton.disabled = true;
        });
}

// Fonction qui gère le changement de la quantité de produits et met à jour le prix
function manageProductQuantity()
{
    let quantityButtons = document.querySelectorAll("#basketSummary input");
    for (let index = 0; index < quantityButtons.length; index++)
    {
        quantityButtons[index].addEventListener("change", function(event)
        {
            // Récupération des produits du panier
            let objectsFromBasket = JSON.parse(localStorage.getItem("object"));
            // Sélection de l'objet dont la quantité a changé
            let object = objectsFromBasket[index];
            // Changement du prix du produit
            let newPrice = (object.price * Number(event.target.value)); // Calcul du nouveau prix
            let currentPrice = document.querySelectorAll("p.price");
            currentPrice[index].innerHTML = priceToEuros(newPrice);
            // Changement du prix total de la commande
            prices[index] = newPrice;
            let totalPrice = document.getElementsByClassName("totalPrice");
            totalPrice[0].innerHTML = priceToEuros(calculateTotalAmount(prices));
            // Mise à jour de la quantité dans le local storage
            object.quantity = Number(event.target.value);
            localStorage.setItem("object", JSON.stringify(objectsFromBasket));
            printBasketQuantity(); // Remise à jour de la quantité du panier
        });
    }    
}

// Fonction qui gère la suppression d'un article au panier
function manageProductSuppression()
{
    let deleteArticle = document.getElementsByClassName("fa-times");
    for (let index = 0; index < deleteArticle.length; index++)
    {
        deleteArticle[index].addEventListener("click", function()
        {
            // Récupération des produits du panier
            let objectsFromBasket = JSON.parse(localStorage.getItem("object"));
            // Supprime un élément du tableau a partir de l'index "index"
            objectsFromBasket.splice(index, 1);
            localStorage.setItem("object", JSON.stringify(objectsFromBasket));
            // Réactualisation de la page pour mettre à jour le panier
            window.location = "panier.html";
        });
    }
}

// Fonction qui gère la validité du formulaire
function manageFormValidity()
{
    let formInputs = document.querySelectorAll("#validationForm input");
    for (let index = 0; index < (formInputs.length - 1); index++)
    {
        formInputs[index].addEventListener('change', function()
        {
            /* Condition qui vérifie si le champ a déjà été renseigné pour ne pas afficher 
            les messages d'erreur des autres champs */
            if (!emptyFormParts[index])
            {
                emptyFormParts[index] = true;
            }
            activateSubmitButton(formInputs);
        });
    }
}

// Fonction qui gère le clic sur le bouton "Envoyer"
function manageFormSubmit()
{
    let submitButton = document.getElementById("submitButton");
    submitButton.addEventListener('click', function()
    {
        // Création de l'objet JS de contact avec les informations nécessaires
        let contact = {
            firstName : formInputs[0].value,
            lastName : formInputs[1].value,
            address : formInputs[2].value,
            city : formInputs[3].value,
            email : formInputs[4].value
        };
        // Enregistrement de l'objet dans le LS
        localStorage.setItem("personalData", JSON.stringify(contact));
        // Ouverture de la page confirmation
        window.location = 'confirmation.html';
    });
}

// Appel de la fonction qui place un cercle au dessus du panier avec le nombre d'éléments
printBasketQuantity();

// Appel la fonction qui affiche le panier
showBasket();

// Appel la fonction qui gère le changement de la quantité de produits
manageProductQuantity();

// Appel la fonction qui gère la suppression d'un article au panier
manageProductSuppression();

// Appel la fonction qui gère la validité du formulaire
manageFormValidity();

// Appel la fonction qui gère le clic sur le bouton "Envoyer"
manageFormSubmit();
