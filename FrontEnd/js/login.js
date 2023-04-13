//Étape 2 : Codez la page de connexion


const form = document.querySelector("#login-form");
const email = document.querySelector("#login-email").value;  
const password = document.querySelector("#login-password").value;

console.log("values")
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // empêcher le rechargement de la page par défaut
  // paramètres d'appel du fetch
  async function connexionUser() {
    // envoi une requête HTTP POST à l'API de connexion avec les informations d'authentification de l'architecte
    /*const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        // pour indiquer le type de données : chaine de caractères (string)
        "Content-Type": "application/json",
      },
      //   Ici le body qu'on envoi avec l'objet qui est convertit en json
      body: JSON.stringify({
        email,
        password,
      }),
    }); */
    const formEl = document.getElementById('login-form');
    console.log("formEl",formEl)
    const formData = new FormData(formEl);
    console.log("this is the funvtion getting")
    const response = await fetch ('http://localhost:5678/api/users/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 


    ///Permet de pouvoir traiter les infos du formData en JSON 
    
    body: JSON.stringify(Object.fromEntries(formData)) })

    // traite la réponse de l'API pour savoir si connexion réussie ou non
    if (response.status === 200) {
      // stock réponse serveur qui représente les informations de l'utilisateur dans variable userInfos
      const userInfos = await response.json();
      sessionStorage.setItem("user", JSON.stringify(userInfos));
      sessionStorage.setItem("isLoggedIn", true)
      sessionStorage.setItem("isLoggedOut", false)
      const isLoggedOutList= document.querySelectorAll(".isLoggedOut");
      isLoggedOutList.forEach(outList => {
        outList.classList.add("hide")
      });
      const isLoggedInList = document.querySelectorAll(".isLoggedIn");
      isLoggedInList.forEach(inList => {
        inList.classList.add("show")
      });
      // redirige l'utilisateur vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // affiche à l'user un message d'erreur quand mdp et/ou email incorrect
      alert("Le mot de passe et/ou l'e-mail est incorrecte");
      sessionStorage.setItem("isLoggedIn", false)
      sessionStorage.setItem("isLoggedOut", true)
      const isLoggedOutList= document.querySelectorAll(".isLoggedOut");
      isLoggedOutList.forEach(outList => {
        outList.classList.add("show")
      });
      const isLoggedInList = document.querySelectorAll(".isLoggedIn");
      isLoggedInList.forEach(inList => {
        inList.classList.add("hide")
      });
    }


    // if loggedIn
  }
  connexionUser();

  

});