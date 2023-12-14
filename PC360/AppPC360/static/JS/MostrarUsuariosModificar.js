const selectButtonUsers = document.getElementById("show-users-2");
const usersList = document.getElementById("user-list-2");
const modalProjectUpdate = document.getElementById('modalTipos');

selectButtonUsers.addEventListener("click", () => 
{
    usersList.classList.toggle("open-users-2");
});

document.addEventListener("click", (event) => {
    if (event.target === modalProjectUpdate) {
        usersList.classList.remove("open-users-2");
    }
});