
// Recuperation des donnees du local storage pour la requete post
let contact = {};
let products = [];
for (let i = 0; i < localStorage.length; i++)
{
    if (localStorage.key(i) === "personalData")
    {
        contact = JSON.parse(localStorage.getItem("personalData"));
    }
    else
    {  
        let object = JSON.parse(localStorage.getItem(localStorage.key(i)));
        products.push(object.id);
    }
}