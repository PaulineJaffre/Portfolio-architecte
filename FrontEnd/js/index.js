window.addEventListener('load', function(){
    
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
     let isLoggedOut = sessionStorage.getItem("isLoggedOut");
    console.log(isLoggedIn, isLoggedOut)
    if (isLoggedIn) {
        const isLoggedInList = document.querySelectorAll(".isLoggedIn");
         isLoggedInList.forEach(inList => {
        inList.style.display = "flex";
          });
    }
    if (isLoggedOut){
        const isLoggedOutList= document.querySelectorAll(".isLoggedOut");
          isLoggedOutList.forEach(outList => {
        outList.style.display ="none";
          });
    }
});
document.querySelector('#logout').addEventListener('click' , function(event) {
    event.preventDefault();

    console.log("se déconnecter")

    deconnecter();
});

// MODALE 2 : AJOUT PHOTO
window.addEventListener('load', async () => { //gestionnaire d'événement à l'objet window pour détecter quand la page a fini de charger
    // Étape 1 : Créez la page de présentation des travaux à partir du HTML existant
    await getCategory();

    document.querySelector('.bouton-tous').click(); 

    // Si l'utilisateur appuie sur la fèche alors retour à la modal d'éditon et supression initiale
    const arrowBack = document.getElementById("arrowBack"); // Définition de la flèche arrière
    arrowBack.addEventListener("click", backToBasicModal );// Ajoute un événement de clic pour revenir en arrière 


    // Appel de la fonction pour récupérer les projets depuis l'API
    getProjectModal();
    // Appel de la fonction pour récupérer les catégories depuis l'API
    getCategoriesModal();


    //si l'utilisateur appuie sur une icone de supression
    document.addEventListener('click', async function (e) {
        if (e.target.classList.contains('deleteTrashIcon')) {
            //récupération de l'id du target
            projectId = e.target.id;
            //Appel de l'API works avec l'id à supprimer en method DELETE
            await fetch("http://localhost:5678/api/works/" + projectId, {
                method: 'DELETE',
                headers: {
                    "Accept": "*/*",
                    "Authorization": 'Bearer ' + sessionStorage.token
                }
            })
            e.target.parentElement.remove(); //suppression du target
            const listToDelete = document.querySelector('.categories');
            listToDelete.innerHTML = "";
            getProject(); //simulation réactualisation de la page 
        }
    }) 
    
    
    

   //création de de la modale ajout Photo avec un formulaire
    let ajoutPhotoBouton = document.getElementById("ajoutPhotoBtn");
    ajoutPhotoBouton.innerHTML="";
    let imgContainer = document.getElementById("imgContainer");
    let imgFile = document.createElement("img");

    let titrePhoto = document.getElementById("titrePhoto");
    let imgErrorMessage = document.createElement("span");
    let titleErrorMessage = document.createElement("span");

    imgFile.setAttribute("id", "imgPreview");
    imgFile.classList.add("photoAjoute");
    imgErrorMessage.classList.add("imgErrorMessage"); // création des messages d'erreurs
    titleErrorMessage.classList.add("titleErrorMessage");

    imgContainer.appendChild(imgFile, imgErrorMessage); // ajout des éléments au parent imgContainer

    //ajouter une image en cliquant sur le btn AjoutPhotoBtn
    imgFile.addEventListener("click", () => {
        ajoutPhotoBouton.click();
    });

    /*valider l'image dans le projet
    ajoutPhotoBouton.addEventListener("change", () => {
        validateImageProject();
    });*/

    // function to get user file input
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('ajoutPhotoBouton')) {
            if (validFileType(e.target.files[0] === '')) { }
            else {
                if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
                    if (e.target.files[0].size > 4000000) { alert('Photo trop volumineuse') }
                    else {
                        const imgUploaded = document.createElement('img');
                        imgUploaded.src = URL.createObjectURL(e.target.files[0]);
                        imgUploaded.className = 'img-uploaded';
                        document.querySelector('.imgContainer').appendChild(imgUploaded);
                    }
                } else { alert('Format non accepté') }
            }
        }
    })

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

   

    /* Activation des boutons d'ajout et de suppression */

    const ajoutButton = document.getElementById("ajout-image"); // Récupère le bouton d'ajout d'images
    ajoutButton.addEventListener("click", addPicture); // Ajoute un événement de clic sur le bouton d'ajout d'images qui appelle la fonction addPicture


});

