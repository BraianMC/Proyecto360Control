const selectButtonUsers = document.getElementById("show-users-3");
const usersList = document.getElementById("user-list-3");

selectButtonUsers.addEventListener("click", () => 
{
    usersList.classList.toggle("open-users-2");
});