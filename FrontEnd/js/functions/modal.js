function stopPropagation (e){ //empêcher la propagation des événements
    e.stopPropagation()
} 

/* MODALE */


/* Création de la modale */


let modal = null //variable qui stockera l'élément de la modale.
const focusableSelector = "button, a, input, textarea" //chaîne de caractères qui spécifie les types d'éléments qui peuvent être mis au point dans la modale
let focusables = [] //stockera tous les éléments focusables de la modale
let previouslyFocusedElement = null //stockera l'élément qui avait le focus avant l'ouverture de la modale.

function openModal (e) {
    e.preventDefault()/*tant que le user n'aura pas cliqué, la modale ne s'ouvrira pas */
    
    modal = document.getElementById(e.target.getAttribute('href'))
    
    const focusableSelector = "button, a, input, textarea" ;//chaîne de caractères qui spécifie les types d'éléments qui peuvent être mis au point dans la modale
    const focusables = Array.from(modal.querySelectorAll(focusableSelector)); //liste de tous les éléments focusables de la modale, créée en utilisant Array.from et querySelectorAll sur modal
    previouslyFocusedElement=document.querySelector(':focus'); //trouver l'élément qui avait le focus avant l'ouverture de la modale.
    modal.style.display = null; //rend la modale visible 
    focusables[0].focus() ;//focus sur le premier élément focusable de la modale
    modal.removeAttribute('aria-hidden'); // rendre la modale visible
    modal.setAttribute('aria-modal', 'true'); //indique que c'est une boîte de dialogue modale
    //modal.addEventListener('click', closeModal); /* ajout d'un gestionnaire d'événement de clic sur la modale pour la fermer */
    modal.querySelector('.closeModal').addEventListener('click', closeModal); /* ajout d'un gestionnaire d'événement de clic sur le bouton de fermeture de la modale pour la fermer */
    modal.querySelector('.closeModal').addEventListener('click', stopPropagation) ;/* ajout d'un gestionnaire d'événement de clic sur le bouton de fermeture de la modale pour éviter la propagation de l'événement de clic */

};

/*Création de la constante closeModal et c'est une fonction qui prend en paramètre l'evenement.*/
function closeModal(e) {
    if (modal === null) return /* si la modale n'existe pas, on sort de la fonction */
   if (previouslyFocusedElement !== null) previouslyFocusedElement.focus() /* si un élément avait le focus avant l'ouverture de la modale, on le remet en focus */
   e.preventDefault() /* empêche le comportement par défaut de l'élément cliqué (ici, un lien) */
   modal.style.display = 'none' /* cache la modale */
   modal.setAttribute('aria-hidden', 'true') /* ajout de l'attribut 'aria-hidden' qui indique que la modale*/
   modal.removeAttribute('aria-modal')
   modal.removeEventListener('click', closeModal)
   modal.querySelector('.closeModal').removeEventListener('click', closeModal)
   modal.querySelector('.closeModal').removeEventListener('click', stopPropagation)
   modal = null
};

 // Navigation inclusive dans la modale par le clavier //
 function focusInModal (e){
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
        if (e.shiftKey === true){ //gestionnaire d'événements pour la touche "Tab" qui permet à l'utilisateur de naviguer dans la modale avec le clavier
            index = (index - 1 + focusables.length) % focusables.length;
        } else {
            index = (index + 1) % focusables.length;
        }
    focusables[index].focus()
}

function escapeModal(e) {
    if (e.key === "Escape" || e.key === "Esc") { //gestionnaire d'événements pour la touche "Escape" qui ferme la modale
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null){ //gestionnaire d'événements sur la fenêtre pour écouter les touches "Tab" et "Escape" même après l'ouverture de la modale.
        focusInModal(e)
    }
}

 /*Création de la constante openModal et c'est une fonction qui prend en paramètre l'evenement.*/ 
    // Ajouter un gestionnaire d'événement de clic au bouton d'ouverture
    document.querySelectorAll('.openModal').forEach(a => {
        
        a.addEventListener('click', openModal)

    });
    window.addEventListener('keydown', function (e){
        escapeModal(e);
    })


//récupère les projets depuis l'API et les ajoute à la modal
async function getProjectModal() {
    fetch("http://localhost:5678/api/works")
        .then(function(response) { 
            return response.json();
        }).then(function(projects) {
            projects.forEach(function(project) { // Parcourt tous les projets récupérés
                addProjectToModal(project); // Appelle la fonction addProjectToModal en lui passant chaque projet en argument
            });   
        });    
}




// Ajoute un projet à la modal
function addProjectToModal(project) {
    const modalGallery = document.querySelector(".modalGallery");

    const figure = document.createElement("figure"); // Crée un élément <figure>
    figure.classList.add("figureModal");

    const img = document.createElement("img"); // Crée un élément <img>
    img.classList.add("imgModal");
    img.src = project.imageUrl; // Définit l'attribut src de l'élément <img> avec l'URL de l'image du projet
    img.width = 100;

    const figcaption = document.createElement("figcaption"); // Crée un élément <figcaption>
    figcaption.classList.add("figCaption");
    figcaption.alt = project.title; // Définit l'attribut alt de l'élément <figcaption> avec le titre du projet
    figcaption.textContent = "éditer"; // Ajoute le texte "Editer" à l'élément <figcaption>

    const categoryId = document.createElement("p"); // Crée un élément <p> pour stocker l'ID de la catégorie
    categoryId.src = project.categoryId; // Définit l'attribut src de l'élément <p> avec l'ID de la catégorie du projet
    

    const deleteWork = document.createElement("i"); // Crée un élément <i> pour le bouton de suppression
    deleteWork.classList.add("deleteTrashIcon", "fa", "fa-solid", "fa-trash-can"); // Ajoute les classes CSS pour l'icône de poubelle
    deleteWork.dataset.id = project.id;

    figure.append(img, figcaption, categoryId, deleteWork); // Ajoute les éléments <img>, <figcaption>, <p> et <i> à l

    modalGallery.append(figure);




    
}



// Cette fonction ouvre la modal pour ajouter une image.
function addPicture(e) { 
    e.preventDefault();
    let modalPhoto = document.querySelector(".modalPhoto"); // Récupère l'élément modalGallery dans le HTML
    let modalAjout = document.querySelector(".modalAjout"); // Récupère l'élément modalAjout dans le HTML
    modalPhoto.style.display = "none"; // Cache la modalGallery
    modalAjout.style.display = "block"; // Affiche la modalAjout
    //modalAjout.querySelector(".closeModal").addEventListener("click", closeModal); // Ajoute un événement de fermeture de modal sur le bouton .closeModal de modalAjout
    modalAjout.addEventListener("click", stopPropagation); // Annule l'événement de fermeture de modal lorsque l'on clique sur la modal elle-même
};

//get toutes les catégories de l'API
async function getCategoriesModal() { 

    fetch("http://localhost:5678/api/categories", {
    method: 'get',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(function(response) {
        return response.json();
    }).then(function(category) {
        addCategoriesToModal(category);
        });
    
   
    


//Ajout des catégories au DOM
function addCategoriesToModal (categories)  {
    const categoriePhotoContainer = document.getElementById("categoriePhoto");

    categories.forEach(function(category) {
        const filtres = document.createElement("option"); // création de la constante filtres et de sa classe "option"

        filtres.value = category.name; // la valeur de la const filtres correspond aux noms des catégories de l'api
        filtres.innerHTML= category.name;
        categoriePhotoContainer.appendChild(filtres);
    });
};

};



function validateImageProject() {
    //création de de la modale ajout Photo avec un formulaire
    let ajoutPhotoBouton = document.getElementById("ajoutPhotoBtn");
    let ajoutPhotoLabel = document.getElementById("ajoutPhotoLabel");
    let imgContainer = document.getElementById("imgContainer");

    
        //appel de la fonction pour vérifier si le fichier est sous un format valide
        //Condition Si il n'y a pas de fichier
        if (!ajoutPhotoBouton.files[0]) { 
            return; //ne rien faire
        }
        //sinon
        else {
            //si le fichier est sous le bon format alors
            if (validFileType(ajoutPhotoBouton.files[0])) {
                //vérification de la taille du fichier
                //si fichier trop volumineux
                if (ajoutPhotoBouton.files[0].size > 4000000) {
                    alert('Photo trop volumineuse');
                }
                //sinon
                else {
                    const imgFile = document.createElement('img');
                    let imgErrorMessage = document.createElement("span");
    
                    imgFile.setAttribute("id", "imgPreview");
                    imgFile.setAttribute('alt', 'Aperçu de l\'image sélectionnée');
                    imgErrorMessage.classList.add("imgErrorMessage"); // création des messages d'erreurs
    
                    imgContainer.appendChild(imgFile); // ajout de l'élément imgFile au parent imgContainer
    
                    imgFile.src = URL.createObjectURL(ajoutPhotoBouton.files[0]); // création de l'url de la photo ajoutée
                    imgFile.className = 'img-uploaded';
                    
                    // Invisibilité des autres éléments de l'image container quand on preview l'image uploadée
                    ajoutPhotoLabel.style.display = "none";
                    let ajoutPhotoIcon = document.getElementById("ajoutPhotoIcon");
                    ajoutPhotoIcon.style.display = "none";
                    let pContainer = document.getElementById("pContainer");
                    pContainer.style.display = "none";

                    // suppression des éléments d'erreur s'ils existent
                    let imgErrorMessageExists = document.querySelector('.imgErrorMessage');
                    
                    if (imgErrorMessageExists) {
                        imgErrorMessageExists.remove();
                    }
                }
            } else {
                alert('Format non accepté');
        }
    }
}

//Listes des fichier accepté par l'input file
const fileTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
];
//fonction de vérification si fichier correcte
function validFileType(file) {
    return fileTypes.includes(file.type);
}



function validateTitleProject() {
    let inputTitle = document.getElementById("titrePhoto");
    if (inputTitle.value === "") { // si le champ de titre reste vide, affichage d'un message d'erreur
        titleErrorMessage.innerText = "Veuillez mettre un titre valide.";
        inputTitle.classList.add("inputError");
    }
    else { // sinon enlever le message d'erreur
        //titleErrorMessage.innerText = "";
        inputTitle.classList.remove("inputError");
    }
}


// Ajout d'un élément
async function validateFormProject() {
    // e.preventDefault();
    
    // Récupération des saisies pour la création du nouvel élément
    const imgUploaded = document.querySelector("#img-uploaded").files[0];
    // console.log(imgUploaded);
    const inputTitle = document.getElementById("#titrePhoto").value;
    // console.log(inputTitle);
    const categoriePhotoContainer = document.getElementById("#categoriePhoto").value;
    // console.log(categoriePhotoContainer);

    if (!inputTitle || !imgUploaded || !categoriePhotoContainer) {
        alert("Veuillez remplir les champs du formulaire.");
    }
  
    // Construction du formData à envoyer
    const formData = new FormData();
    formData.append("img-uploaded", imgUploaded);
    formData.append("titrePhoto", inputTitle);
    formData.append("categoriePhoto", categoriePhotoContainer);
  
    // Appel de la fonction fetch avec toutes les informations nécessaires
    let response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    });
    // console.log(response.status);
    // console.log(result);
  
    // Conditions: Authentification, redirection et erreurs
    if (response.status === 200 || 204) {
        
        getProject();
    return clearForm();
    } else if (response.status === 401 || 400) {
      console.log("Action impossible");
    };
  };



function clearForm() {
    document.getElementById("ajoutPhoto-form").reset();
    imgFile.src = "";
    imgFile.style.visibility = "hidden";
    inputContainer.style.display = "inline-block";
}


// Si l'utilisateur appuie sur la fèche alors retour à la modal d'éditon et supression initiale
function backToBasicModal() {
    let modalPhoto = document.querySelector(".modalPhoto"); // Récupère l'élément modalGallery dans le HTML   
    let modalAjout = document.querySelector(".modalAjout"); // Récupère l'élément modalAjout dans le HTML
    modalPhoto.style.display = "block"; // Affiche la modalGallery
    modalAjout.style.display = "none"; // Cache la modalAjout
}
