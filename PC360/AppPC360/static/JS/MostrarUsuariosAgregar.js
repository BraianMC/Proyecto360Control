const selectArrow = document.getElementById("show-users-1");
const usersListAdd = document.getElementById("user-list-1");
const modalProjectCreate = document.getElementById('mimodal');

selectArrow.addEventListener("click", () => 
{
    usersListAdd.classList.toggle("open-users-1");
});

document.addEventListener("click", (event) => {
    if (event.target === modalProjectCreate) {
        usersListAdd.classList.remove("open-users-1");
    }
});