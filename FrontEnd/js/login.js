//Étape 2 : Codez la page de connexion


const form = document.querySelector("#login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // empêcher le rechargement de la page par défaut
  // paramètres d'appel du fetch

  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;


  connexionUser();



});
