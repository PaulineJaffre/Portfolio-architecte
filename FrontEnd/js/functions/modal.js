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
    
    /*Supprimer les images sélectionnées
    deleteWork.addEventListener("click", async function (projectId) {
        try {
            const res = await fetch("http://localhost:5678/api/works/" + projectId, {
                method: "DELETE",
                headers: {
                    "accept": "* / *",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (res.ok) {
                document.getElementById(workId).remove();
                document.getElementById("project-work-" + workId).remove();
            }
        }
        catch (err) {
            console.error(err);
        }
    });*/

    
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

function validateTitleProject() {
    if (titrePhoto.value === "") { // si le champ de titre reste vide, affichage d'un message d'erreur
        titleErrorMessage.innerText = "Veuillez mettre un titre valide.";
        titrePhoto.classList.add("inputError");
    }
    else { // sinon enlever le message d'erreur
        titleErrorMessage.innerText = "";
        titrePhoto.classList.remove("inputError");
    }
}

function validateFormProject() {
    let ajoutPhotoBouton = document.querySelector("ajoutPhotoBtn");
    let fileSize = ajoutPhotoBouton.files[0].size; // récupère la taille de l'image
    const maxFileSize = 4 * 1024 * 1024; // détermine une taille maximum de 4MB
    
    if((ajoutPhotoBouton.files.length === 0) || (fileSize > maxFileSize) || (titrePhoto.value === "")) { // vérifie si la taille du fichier est trop grand, si l'encart est vide ou le titre est vide
        alert("Veuillez rajouter une image et/ou un titre valide"); // display donc un message d'erreur
    }
    else {
        let filtreContainer = document.getElementById("categoriePhoto"); // Récupère le conteneur des options de filtrage
        const selectedIndex = filtreContainer.options.selectedIndex; // Récupère l'indice de l'option sélectionnée
        let selectedIdOption = filtreContainer.options[selectedIndex].id; // Récupère l'id de l'option sélectionnée
        
        const formData = new FormData(); // création d'un formulaire object
        formData.append("image", ajoutPhotoBouton.files[0]); // ajout de l'image au formulaire
        formData.append("title", titrePhoto.value); // ajout du titre au formulaire
        formData.append("category", selectedIdOption); //  ajout de l'id au formulaire

        sendForm(formData); // envoi du nouveau formulaire rempli au serveur
    }
}

function validateImageProject() {

    let inputFile = document.querySelector('.ajoutPhotoBouton')
        //appel de la fonction pour vérifier si le fichier est sous un format valide
        //Condition Si il n'y a pas de fichier
        if (validFileType(inputFile.files[0] === '')) { //ne rien faire
        }
        //sinon
        else {
            //si le fichier est sous le bon format alors
            if (inputFile.files[0].type === 'image/png' || inputFile.files[0].type === 'image/jpeg') {
                //vérification de la taille du fichier
                //si fichier trop volumineux
                if (inputFile.files[0].size > 4000000) { alert('Photo trop volumineuse') } //alerte
                //sinon
                else {
                    const imgUploaded = document.createElement('img');
                    imgUploaded.src = URL.createObjectURL(inputFile.files[0]);
                    imgUploaded.className = 'img-uploaded';
                    document.querySelector('.imgContainer').appendChild(imgUploaded); //je créer la visualisation de l'image
                    imageUploaded = true;
                }
            } else { alert('Format non accepté') } //sinon format non accepté
        }
    }

//Listes des fichier accepté par l'input file
const fileTypes = [
    "image/jpeg",
    "image/png"
];
//fonction de vérification si fichier correcte
function validFileType(file) {
    return fileTypes.includes(file.type);
}
    /*let ajoutPhotoBouton = document.querySelector("ajoutPhotoBtn");

    let imgFile = document.querySelector("photoAjoute");
    //imgFile.style.display= 'block'; // Affiche l'aperçu de l'image

    let file= ajoutPhotoBouton.files[0]; // Récupère le fichier sélectionné

    const inputContainer= document.querySelector("imgContainer");

        if (file) {
            imgPreview.src = URL.createObjectURL(file); // Crée une URL pour l'aperçu de l'image
            inputContainer.classList.add("hide"); // Ajoute la classe "hide" au conteneur de l'image
        
            let fileSize = file.size; // Récupère la taille de l'image
            //1MB = 1024, 4MB = 4096 * 1024
            const maxFileSize = 4096 * 1024; // Définit la taille maximale autorisée pour l'image (ici, 4 Mo)
        
        // Vérifie si la taille de l'image dépasse la taille maximale autorisée
        if (fileSize > maxFileSize) {
            imgFile.remove(); // Supprime l'aperçu de l'image
            inputContainer.classList.add("show"); // Ajoute la classe "show" au conteneur de l'image
            imgErrorMessage.innerText = "La taille de l'image est trop grande"; // Affichage du message d'erreur si mauvaise taille
        }
        else {
            imgErrorMessage.innerText = "";
        }
    }
    //do not allow empty img src
    else if (imgFile.src === "") {
        imgFile.remove();
        inputContainer.classList.add("show");
    }
}*/

//function - envoi du formulaire à l'api
async function sendForm(formData) {
    try {
        const res = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        if (res.ok) {
            const newProject = await res.json();
            //reset form
            clearForm();
            //add work to modal and gallery
            addProjectToModal(newProject);
            project(newProject);
        }
    } catch (err) {
    console.error(err);
  }
}

function clearForm() {
    document.getElementById("ajoutPhoto-form");
    ajoutPhoto-form.reset();
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