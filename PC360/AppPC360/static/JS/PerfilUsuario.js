const profile = document.querySelector(".profile");
const userMenu = document.querySelector(".menu");

profile.addEventListener("click", () => 
{
    console.log("clik en perfil");
    userMenu.classList.toggle("active");
    
});


