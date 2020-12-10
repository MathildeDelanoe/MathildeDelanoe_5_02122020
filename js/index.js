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
    console.log(response);
})
.catch(error => console.log("Erreur : " + error))