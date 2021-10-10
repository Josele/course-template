/******************************************************************************
 *                        Event listener
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-user-btn')) {
        addUser();
    } else if (ele.matches('.edit-user-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-user-btn')) {
        deleteUser(ele);
    } else if (ele.matches('#logout-btn')) {
        logoutUser();
    } else if (ele.matches('#admin-btn')) {
        goAdminPanel();
    }
}, false)

/******************************************************************************
 *                        Travel 
 ******************************************************************************/

function goAdminPanel() {
    window.location.href = '/users';
}

function goIndex() {
    window.location.href = '/';
}

function goUserProfile() {
    window.location.href = '/user-profile';
}

function goAdminPanel() {
    window.location.href = '/users';
}
