/**
 * Handles the logout process.
 * Removes the authentication token, displays a success message,
 * and redirects the user to the login page.
 */
function handleLogout() {
    // Remove the authentication token from local storage
    localStorage.removeItem('token');

    // Display a success message to the user
    alert("Logged out successfully!");

    // Redirect the user to the login page
    window.location.href = "/login";
}

export default handleLogout;