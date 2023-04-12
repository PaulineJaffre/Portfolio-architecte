window.addEventListener('load', async (e) => { //gestionnaire d'événement à l'objet window pour détecter quand la page a fini de charger
    // Étape 1 : Créez la page de présentation des travaux à partir du HTML existant
    await getCategory();

    document.querySelector('.bouton-tous').click(); 

    /* Création de la modale */


    let modal = null //variable qui stockera l'élément de la modale.
    const focusableSelector = "button, a, input, textarea" //chaîne de caractères qui spécifie les types d'éléments qui peuvent être mis au point dans la modale
    let focusables = [] //stockera tous les éléments focusables de la modale
    let previouslyFocusedElement = null //stockera l'élément qui avait le focus avant l'ouverture de la modale.

    // Appel de la fonction pour récupérer les projets depuis l'API
    getProjectModal();
    // Appel de la fonction pour récupérer les catégories depuis l'API
    getCategoriesModal();
    
   //création de de la modale ajout Photo avec un formulaire
    const modalAjout = document.querySelector("modalAjout");
    let ajoutPhotoBouton = document.getElementById("ajoutPhotoBtn");
    let imgContainer = document.getElementById("imgContainer");
    let imgFile = document.createElement("img");
    let titrePhoto = document.getElementById("titrePhoto");
    let imgErrorMessage = document.createElement("span");
    let titleErrorMessage = document.createElement("span");

    imgFile.setAttribute("id", "imgPreview");
    imgErrorMessage.classList.add("imgErrorMessage"); // création des messages d'erreurs
    titleErrorMessage.classList.add("titleErrorMessage");

    imgContainer.appendChild(imgFile, imgErrorMessage); // ajout des éléments au parent imgContainer

    //ajouter une image en cliquant sur le btn AjoutPhotoBtn
    imgFile.addEventListener("click", () => {
        ajoutPhotoBouton.click();
    });

    //valider l'image dans le projet
    ajoutPhotoBouton.addEventListener("change", () => {
         validateImageProject();
    });

    //valider le titre du nouveau projet ajouté
    titrePhoto.addEventListener("input", (e) => {
        validateTitleProject(e);
    });

    //validation du formulaire
    const submitPhoto = document.getElementById("validerBtn");
    submitPhoto.addEventListener("click", (e) => { // ajout d'un gestionnaire d'evenement au clic sur le btn de validation
        e.preventDefault();

        validateFormProject();
    });

    /*Création de la constante openModal et c'est une fonction qui prend en paramètre l'evenement.*/ 
    // Ajouter un gestionnaire d'événement de clic au bouton d'ouverture
    document.querySelectorAll('.openModal').forEach(a => {
        
        a.addEventListener('click', openModal)

    });
    window.addEventListener('keydown', function (e){
        escapeModal(e);
    })

    /* Activation des boutons d'ajout et de suppression */

    const ajoutButton = document.getElementById("ajout-image"); // Récupère le bouton d'ajout d'images
    ajoutButton.addEventListener("click", addPicture); // Ajoute un événement de clic sur le bouton d'ajout d'images qui appelle la fonction addPicture

});

