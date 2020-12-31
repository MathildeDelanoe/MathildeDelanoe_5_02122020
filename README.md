# Description OriTeddy #

## Pré-requis ##

Il faut avoir récupérer le repo disponible ici https://github.com/OpenClassrooms-Student-Center/JWDP5.git
Suivez les indications du readme.md propre à ce repo pour pouvoir accéder au serveur. Une fois le serveur lancé, vous pouvez ouvrir le fichier index.html de ce repo et naviguer à travers le site.

## Fonctionnalités de base ##
Cette partie décrit les fonctionnalités de base du site de e-commerce telles qu'énoncées dans le cahier des charges.

### Page principale ###
La page principale présente le catalogue de notre site Oriteddy. Le contenu du catalogue est déterminé par le backend.  
![catalogue](/img/presentationCatalogue.jpg)
Chaque élement du catalogue est cliquable dans son ensemble et permet de rediriger l'utilisateur vers la page du produit correspondant. Pour cela, nous utilisons la possibilité de passer des paramètres dans l'url d'une page web.

### Page produit ###
La page produit contient la description du produit sélectionné et permet à l'utilisateur de sélectionner une personnalisation du produit. La personnalisation est obligatoire afin d'ajouter le produit au panier.

### Page panier ###
Cette page récapitule le contenu du panier et indique le prix total de la commande. Un formulaire est présent sous le récapitulatif du panier afin de valider définitivement la commande. Tous les champs doivent être renseignés et corrects avant d'accéder à la soumission du formulaire.

### Page confirmation ###
Une fois la commande validée, nous arrivons sur la page de confirmation où nous obtenons un récapitulatif et un numéro de commande. A ce moment, le panier est vidé. 

### Gestion de la responsivité ###
Le site répond bien aux différentes tailles d'écran. Par exemple, les éléments suivants s'adaptent en fonction de l'écran sur lesquels ils sont visualisés :
* La barre de navigation
* Le catalogue

## Fonctionnalités supplémentaires apportées ##
Quelques améliorations ont été implémentées pour rendre le site de e-commerce plus réaliste.

### Affichage du prix en euros ###
Le prix des articles reçu par le serveur est exprimé en centimes. Pour que cela soit plus visible, nous affichons les différents prix en une notation un peu plus commune pour des prix. Par exemple, le prix d'un ourson sera exprimé comme ceci : 29.00€

### Affichage du nombre d'éléments du panier ###
Afin de rendre compte à l'utilisateur du nombre d'éléments dans son panier, nous avons rajouté un petit cercle proche de l'onglet "panier" de la barre de navigation qui contient le nombre d'éléments présents dans le panier.

### Choix après ajout dans le panier ###
Lors de l'ajout au panier d'un produit, l'utilisateur se voit demander ce qu'il souhaite faire ensuite. Il peut soit :
* consulter de nouveau le catalogue
* consulter son panier

### Suppression d'un élément du panier ###
L'utilisateur peut supprimer des éléments de son panier en cliquant sur la croix qui est situé à droite de l'élément en question dans le panier.  
![Suppression panier](/img/suppressionElementPanier.jpg)

### Sélection du nombre de produits ###
Lorsque l'utilisateur ajoute un produit à son panier, ce dernier n'est ajouté qu'en un seul exemplaire. Lorsque l'utilisateur consulte son panier, il a la possibilité d'augmenter la quantité de son produit. Il peut ainsi augmenter, ou diminuer, la quantité d'un produit. Cette action met à jour automatiquement, les prix intermédiaires et le prix total du panier.  
![gestion quantité par produit](/img/quantitePanierEtChangementPrix.jpg)

### Retour vers la description du produit ###
Au sein du panier, l'utilisateur a la possibilité de retourner à la description du produit en cliquant sur son image.  
![retour vers la page produit](/img/retourProduit.jpg)

### Indication de validité du formulaire ###
Lors de la saisie des différents champs du formulaire, l'utilisateur est averti de la validité des champs par des indicateurs. Lorsque le champ est incorrect, un cadre rouge entoure le champ et un message d'erreur apparaît sous le champ en question. En cas de champ valide, une petite coche verte est affichée à côté du champ.  
![indication formulaire](/img/formulaire.jpg)