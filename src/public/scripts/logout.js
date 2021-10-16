

/******************************************************************************
 *                        Listeners
 ******************************************************************************/

document.addEventListener('click', function (event) {
//    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#logout-btn')) {
        logoutUser();
    }
}, false)

/******************************************************************************
 *                        User public functions
 ******************************************************************************/

function logoutUser() {
    Http.Get('/api/auth/logout')
        .then(() => {
            window.location.href = '/';
        })
}
