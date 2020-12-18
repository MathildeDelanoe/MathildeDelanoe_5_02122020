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

// Lancement de la requete post avec fetch
let options = 
{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact, products})
};

fetch('http://localhost:3000/api/teddies/order', options)
.then(function(response)
    {
        if (response.ok && (response.status >= 200 && response.status <= 299))
        {
            return response.json(); // Gestion des bons cas seulement si le code est entre 200 et 299
        }
        else
        {
            throw new Error('error code outside [200, 299]');
        }
    })
.then(function(response)
    {
        console.log(response);
    })
.catch(error => console.log(error))