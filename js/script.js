document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarNav = document.getElementById("navbarNav");
    const navLinks = document.querySelectorAll(".nav-link");

    // Tutup navbar saat klik link navigasi
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarNav.classList.contains("show")) {
                navbarToggler.click(); // menutup navbar
            }
        });
    });

    // Tutup navbar saat klik di luar area navbar
    document.addEventListener("click", (event) => {
        if (!navbarNav.contains(event.target) && !navbarToggler.contains(event.target) && navbarNav.classList.contains("show")) {
            navbarToggler.click(); // menutup navbar
        }
    });
});