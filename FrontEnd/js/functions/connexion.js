
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
    console.log("formEl", formEl)
    const formData = new FormData(formEl);
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json', },


      ///Permet de pouvoir traiter les infos du formData en JSON 

      body: JSON.stringify(Object.fromEntries(formData))
    })

    // traite la réponse de l'API pour savoir si connexion réussie ou non
    if (response.status === 200) {
      // stock réponse serveur qui représente les informations de l'utilisateur dans variable userInfos
      const userInfos = await response.json();
      const token = JSON.stringify(userInfos.token);
      sessionStorage.setItem("token", JSON.parse(token));
      sessionStorage.setItem("isLoggedIn", true)
      sessionStorage.setItem("isLoggedOut", false)
      const isLoggedOutList = document.querySelectorAll(".isLoggedOut");
      isLoggedOutList.forEach(outList => {
        outList.hidden = true;
      });
      const isLoggedInList = document.querySelectorAll(".isLoggedIn");
      isLoggedInList.forEach(inList => {
        inList.hidden = false;
      });
      // redirige l'utilisateur vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // affiche à l'user un message d'erreur quand mdp et/ou email incorrect
      alert("Le mot de passe et/ou l'e-mail est incorrecte");
      sessionStorage.setItem("isLoggedIn", false)
      sessionStorage.setItem("isLoggedOut", true)
      const isLoggedOutList = document.querySelectorAll(".isLoggedOut");
      isLoggedOutList.forEach(outList => {
        outList.hidden = false;
      });
      const isLoggedInList = document.querySelectorAll(".isLoggedIn");
      isLoggedInList.forEach(inList => {
        inList.hidden = true;
      });
    }


    // if loggedIn
  }

function deconnecter() {
  //sessionStorage.removeItem("token", JSON.parse(token));
  sessionStorage.removeItem("isLoggedIn", false)
  sessionStorage.removeItem("isLoggedOut", true)
  const isLoggedOutList = document.querySelectorAll(".isLoggedOut");
  isLoggedOutList.forEach(outList => {
    outList.hidden = false;
      });
  const isLoggedInList = document.querySelectorAll(".isLoggedIn");
  isLoggedInList.forEach(inList => {
      inList.hidden = true;
      });
  // redirige l'utilisateur vers la page d'accueil
  window.location.href = "./index.html";

}