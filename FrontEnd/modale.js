window.addEventListener('load', (e) => { //gestionnaire d'événement à l'objet window pour détecter quand la page a fini de charger


    /* Création de la modale */


    let modal = null //variable qui stockera l'élément de la modale.
    const focusableSelector = "button, a, input, textarea" //chaîne de caractères qui spécifie les types d'éléments qui peuvent être mis au point dans la modale
    let focusables = [] //stockera tous les éléments focusables de la modale
    let previouslyFocusedElement = null //stockera l'élément qui avait le focus avant l'ouverture de la modale.
    
   
/*Création de la constante openModal et c'est une fonction qui prend en paramètre l'evenement.*/ 
    const openModal = function (e) {
        e.preventDefault()/*tant que le user n'aura pas cliqué, la modale ne s'ouvrira pas */
        
        modal = document.getElementById(e.target.getAttribute('href'))
        console.log(modal);
        const focusables = Array.from(modal.querySelectorAll(focusableSelector)) //liste de tous les éléments focusables de la modale, créée en utilisant Array.from et querySelectorAll sur modal
        previouslyFocusedElement=document.querySelector(':focus') //trouver l'élément qui avait le focus avant l'ouverture de la modale.
        modal.style.display = null //rend la modale visible 
        focusables[0].focus() //focus sur le premier élément focusable de la modale
        modal.removeAttribute('aria-hidden') // rendre la modale visible
        modal.setAttribute('aria-modal', 'true') //indique que c'est une boîte de dialogue modale
        modal.addEventListener('click', closeModal) /* ajout d'un gestionnaire d'événement de clic sur la modale pour la fermer */
        modal.querySelector('.closeModal').addEventListener('click', closeModal) /* ajout d'un gestionnaire d'événement de clic sur le bouton de fermeture de la modale pour la fermer */
        modal.querySelector('.closeModal').addEventListener('click', stopPropagation) /* ajout d'un gestionnaire d'événement de clic sur le bouton de fermeture de la modale pour éviter la propagation de l'événement de clic */
    
    };

    /*Création de la constante closeModal et c'est une fonction qui prend en paramètre l'evenement.*/
    const closeModal= function (e) {
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
    
    const stopPropagation = function (e){ //empêcher la propagation des événements
        e.stopPropagation()
    } 
    
    // Navigation inclusive dans la modale par le clavier //
    const focusInModal = function (e){
        e.preventDefault()
        let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
            if (e.shiftKey === true){ //gestionnaire d'événements pour la touche "Tab" qui permet à l'utilisateur de naviguer dans la modale avec le clavier
                index = (index - 1 + focusables.length) % focusables.length;
            } else {
                index = (index + 1) % focusables.length;
            }
        focusables[index].focus()
    }
    
    // Ajouter un gestionnaire d'événement de clic au bouton d'ouverture

    document.querySelectorAll('.openModal').forEach(a => {
        a.addEventListener('click', openModal)
    
});
    window.addEventListener('keydown', function (e){
        if (e.key === "Escape" || e.key === "Esc") { //gestionnaire d'événements pour la touche "Escape" qui ferme la modale
            closeModal(e)
        }
        if (e.key === 'Tab' && modal !== null){ //gestionnaire d'événements sur la fenêtre pour écouter les touches "Tab" et "Escape" même après l'ouverture de la modale.
            focusInModal(e)
        }
    })

});

/* Activation des boutons d'ajout et de suppression */

// Cette fonction ouvre la modal pour ajouter une image.
const addPicture = function (e) { 
    e.preventDefault();
    let modalGallery = document.querySelector(".modalGallery"); // Récupère l'élément modalGallery dans le HTML
    let modalAjout = document.querySelector(".modalAjout"); // Récupère l'élément modalAjout dans le HTML
    modalGallery.style.display = "none"; // Cache la modalGallery
    modalAjout.style.display = "block"; // Affiche la modalAjout
    modalAjout.querySelector(".closeModal").addEventListener("click", closeModal); // Ajoute un événement de fermeture de modal sur le bouton .closeModal de modalAjout
    modalAjout.addEventListener("click", stopPropagation); // Annule l'événement de fermeture de modal lorsque l'on clique sur la modal elle-même
};

const ajoutButton = document.getElementById("ajout-image"); // Récupère le bouton d'ajout d'images
ajoutButton.addEventListener("click", addPicture); // Ajoute un événement de clic sur le bouton d'ajout d'images qui appelle la fonction addPicture

//récupère les projets depuis l'API et les ajoute à la modal
async function getProjectArrays() {
    const projects = await getAllProjects();    
    addProjectToModal(projects); // Récupère tous les projets de l'API avec la fonction getAllProjects()
}

//Ajoute des projets au DOM
const addProjectToModal = (projects) => {
    works.forEach(function(project) { // Parcourt tous les projets récupérés
        addProjectToModal(project); // Appelle la fonction addProjectToModal en lui passant chaque projet en argument
    });
};

// Ajoute un projet à la modal
function addProjectToModal(project) {
    const modalGallery = document.querySelector("modalGallery");
    
    const figure = createElement("figure"); // Crée un élément <figure>

    const img = document.createElement("img"); // Crée un élément <img>
    img.src = project.imageurl; // Définit l'attribut src de l'élément <img> avec l'URL de l'image du projet

    const figcaption = document.createElement("figcaption"); // Crée un élément <figcaption>
    figcaption.alt = project.title; // Définit l'attribut alt de l'élément <figcaption> avec le titre du projet
    figcaption.textContent = "Editer"; // Ajoute le texte "Editer" à l'élément <figcaption>

    const categoryId = document.createElement("p"); // Crée un élément <p> pour stocker l'ID de la catégorie
    categoryId.src = project.categoryId; // Définit l'attribut src de l'élément <p> avec l'ID de la catégorie du projet

    const deleteWork = document.createElement("i"); // Crée un élément <i> pour le bouton de suppression
    deleteWork.classList.add("fa, fa-solid", "fa-trash-can"); // Ajoute les classes CSS pour l'icône de poubelle

    figure.append(img, figcaption, categoryId, deleteWork); // Ajoute les éléments <img>, <figcaption>, <p> et <i> à l

    modalGallery.append(figure);

    // Supprimer les images sélectionnées
    deleteWork.addEventListener("click", async function (projectId) {
        try {
            const res = await fetch("http://localhost:5678/api/works/" + projectId, {
                method: "DELETE",
                headers: {
                    "accept": "*/*",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (res.ok) {
                document.getElementById(workId).remove();
                document.getElementById("project-work-" + workId).remove();
            }
        }
        catch (err) {
            console.error(error);
        }
    });
    

//création de de la modale ajout Photo avec un formulaire
const modalAjout = document.querySelector("modalAjout");
let ajoutPhotoBouton = document.getElementById("ajoutPhotoBtn");
let imgContainer = document.getElementById("imgContainer");
let imgFile = document.createElement("img");
let titrePhoto = document.getElementById("titrePhoto");
let imgErrorMessage = document.createElement("span");
let titleErrorMessage = document.createElement("span");

imgFile.setAttribute("id", "imgPreview");
imgErrorMessage.classList.add("imgErrorMessage");
titleErrorMessage.classList.add("titleErrorMessage");

imgContainer.appendChild(imgFile);
imgContainer.appendChild(imgErrorMessage);

//ajouter une image en cliquant sur le btn 
imgFile.addEventListener("click", (e) => {
    ajoutPhotoBouton.click();
});

//valider l'image dans le projet
ajoutPhotoBouton.addEventListener("change", (e) => {
    imgFile.style.visibility = "visible";

    let [file] = ajoutPhotoBouton.files;

    if (file) {
        imgPreview.src = URL.createObjectURL(file);
        inputContainer.style.display = "none";

        let fileSize = file.size;
        //1MB = 1024, 4MB = 4096 * 1024
        const maxFileSize = 4096 * 1024;
        
        //restrict img size
        if (fileSize > maxFileSize) {
            imgFile.remove();
            inputContainer.style.display = "inline-block";
            imgErrorMessage.innerText = "La taille de l'image est trop grande";
        }
        else {
            imgErrorMessage.innerText = "";
        }
    }
    //do not allow empty img src
    else if (imgFile.src === "") {
        imgFile.remove();
        inputContainer.style.display = "inline-block";
    }
});

//valider le titre du nouveau projet ajouté
titrePhoto.addEventListener("input", (e) => {
    if (titrePhoto.value === "") {
        titleErrorMessage.innerText = "Veuillez mettre un titre valide.";
        titrePhoto.classList.add("inputError");
    }
    else {
        titleErrorMessage.innerText = "";
        titrePhoto.classList.remove("inputError");
    }
});

//get toutes les catégories de l'API
async function getCategoriesArrays() {
    const categories = await getAllCategories();
    addCategoriesToModal(categories);
}

//Ajout des catégories au DOM
const addCategoriesToModal = (categories) => {
    const categoriePhotoContainer = document.getElementById("categoriePhoto");

    categories.forEach(function(category) {
        const filtres = document.createElement("option");

        filtres.value = category.name;

        categoriePhotoContainer.appendChild(filtres);
    });
};

//validation du formulaire
const submitPhoto = document.getElementById("validerBtn");
submitPhoto.addEventListener("click", (e) => {
    e.preventDefault();

    let fileSize = imgButton.files[0].size;
    const maxFileSize = 4096 * 1024;
    
    if((ajoutPhotoBouton.files.length === 0) || (fileSize > maxFileSize) || (titrePhoto.value === "")) {
        alert("Veuillez rajouter une image et/ou un titre valide");
    }
    else {
        let filtreContainer = document.getElementById("categoriePhoto");
        const selectedIndex = filtreContainer.options.selectedIndex;
        let selectedIdOption = filtreContainer.options[selectedIndex].id;

        const formData = new FormData();
        formData.append("image", ajoutPhotoBouton.files[0]);
        formData.append("title", titrePhoto.value);
        formData.append("category", selectedIdOption);

        sendForm(formData);
    }
});

//function sending the form to the API
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
            const newWork = await res.json();
            //reset form
            clearForm();
            //add work to modal and gallery
            addProjectToModal(newProject);
            addProject(newProject);
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

}

// Appel de la fonction pour récupérer les projets depuis l'API
getProjectsArrays();
// Appel de la fonction pour récupérer les catégories depuis l'API
getCategoriesArrays();
