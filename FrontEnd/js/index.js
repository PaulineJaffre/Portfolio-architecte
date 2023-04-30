
window.addEventListener('load', function(){
    
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
     let isLoggedOut = sessionStorage.getItem("isLoggedOut");
    console.log(isLoggedIn, isLoggedOut)
    if (isLoggedIn) {
        //const divCategory = document.querySelector("filtres");
        //divCategory.style.display="none";
        const isLoggedInList = document.querySelectorAll(".isLoggedIn");
         isLoggedInList.forEach(inList => {
        inList.style.display = "flex";
          });
    }
    if (isLoggedOut){
        //divCategory.style.display="flex";
        const isLoggedOutList= document.querySelectorAll(".isLoggedOut");
          isLoggedOutList.forEach(outList => {
        outList.style.display ="none";
          });
    }
});

const fileInput = document.getElementById('ajoutPhotoBtn');
fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
  console.log(selectedFile);
}

document.getElementById('logout').addEventListener('click' , function(event) {
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

            projectId = e.target.dataset.id;
            console.log(sessionStorage.getItem('token'));

            //Appel de l'API works avec l'id à supprimer en method DELETE
            await fetch("http://localhost:5678/api/works/" + projectId, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            
            if (confirm("Voulez-vous supprimer l'image?") == true) {
                e.target.parentElement.remove(); //suppression du target
                //const figureGallery = document.querySelector(".figureGallery");
                //figureGallery.id = e.target.dataset.id;
                //figureGallery.remove();
            } else {
                backToBasicModal;
            }
            
        }
    }) 
    
    

    /* Activation des boutons d'ajout et de suppression */


    const ajoutButton = document.getElementById("ajout-image"); // Récupère le bouton d'ajout d'images
    ajoutButton.addEventListener("click", addPicture); // Ajoute un événement de clic sur le bouton d'ajout d'images qui appelle la fonction addPicture
  
});
    
    //ajouter une image en cliquant sur le btn AjoutPhotoBtn

    let ajoutPhotoBouton = document.getElementById("ajoutPhotoBtn");
    ajoutPhotoBouton.addEventListener("change", validateImageProject);
    


    //valider le titre du nouveau projet ajouté
    titrePhoto.addEventListener("input", (e) => {
        validateTitleProject(e);
    });

    // Changement de couleur du bouton lorsque le user a rempli le formulaire
    document.addEventListener('change', function(e){
        if (e.target.classList.contains('validerBtn')){
            const validerBtn = document.getElementById('validerBtn');
            const userFile = document.getElementById('imgPreview');
            const userTitle = document.getElementById('titrePhoto');
            const userCategory = document.getElementById('categoriePhoto');
            if (userFile === false || userTitle.value === ''|| userCategory.value === ''){
                validerBtn.classList.add('validerBtnFalse');
                //validerBtn.classList.remove('validerBtnTrue')
            } else {
                validerBtn.classList.add('validerBtnTrue');
            }
        }
    })

    //validation du formulaire
    const submitPhoto = document.getElementById("validerBtn");
    submitPhoto.addEventListener("click", (e) => { // ajout d'un gestionnaire d'evenement au clic sur le btn de validation
        e.preventDefault();

        validateFormProject();
    });



  




