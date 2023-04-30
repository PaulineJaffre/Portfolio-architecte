
function getProject(event){
    // récupération de la div publications pour insérer la liste des publications
    const divGallery = document.querySelector(".gallery");

    // on vide la div des publications au cas où on a déjà appliqué un filtre
    divGallery.innerHTML = "";

    fetch("http://localhost:5678/api/works")
        .then(function(response) { 
            return response.json();
        })
        .then(function(projects){

            const travauxObjets = projects.filter(function (travaux) 
            { 
                if(event.target.dataset.id >= 1 ) { 
        
                    return travaux.categoryId == event.target.dataset.id; 
        
                } 
                else { 
                    return travaux.categoryId >= 1; 
                } 
            }); 

            // parcours des projets
            travauxObjets.forEach(function(project) {
                    // création d'une div
                   
                    const div = document.createElement("div");
                    div.classList.add(["cartesBody"]);
                    // ajout des images
                    const figureCaption = document.createElement("figcaption");
                    figureCaption.className="figureGallery";
                    const image = document.createElement("img");
                    image.src = project.imageUrl;
                    figureCaption.append(image);
                    // ajout des images à la div
                    div.append(image);
                    // création du titre de publication
                    const h3 = document.createElement("h3");
                    h3.innerText = project.title;
                    // ajout du titre à la div
                    div.append(h3);
                    // ajout de la div publication à la div générale gallery
                    divGallery.append(div);
            })


        })
        .catch(function(error) {
           console.log("Erreur : " + error)
        }); 


    }


    // CATEGORIES 



async function getCategory() {
    

    const divCategory = document.querySelector(".categories");
    

    // paramètres de tri des catégories //
    await fetch("http://localhost:5678/api/categories")
    .then(function(response) {
        return response.json();
    })
    .then(function(categories) {

        

        // création des filtres

        const boutonTous = document.createElement("button"); // Utilisation de createElement pour créer un bouton 
        boutonTous.classList.add("bouton-tous");
        boutonTous.classList.add("filtres");
        boutonTous.innerText = "Tous";
        boutonTous.dataset.id=0; // Définition de la value du bouton tous
        boutonTous.onclick = (event) => getProject(event);
        divCategory.append(boutonTous); // ajout des boutons à la div générale Catégories



        categories.forEach(function (category) {
            const button = document.createElement("button");
            button.classList.add("filtres");
            button.dataset.id = category.id;
            button.innerText = category.name;
            button.onclick = (event) => getProject(event);
            divCategory.append(button); // ajout des boutons à la div générale Catégories
        })
    });


    const elements = divCategory.querySelectorAll('.filtres');
    elements.forEach((element) => {
        element.addEventListener("click", () => {
            elements.forEach((element) => {
                element.classList.remove("activated");
                // au clic sur un bouton on retire la class "active" pour tous
              });
              element.classList.add("activated");
              // et on ajoute cette class active sur le bouton cliqué
        });
    });   

