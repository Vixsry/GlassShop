// Tutup menu saat link (seperti Home, About) diklik, kecuali dropdown
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        // Jika link adalah bagian dari dropdown, biarkan menu dropdown tetap terbuka
        if (!link.closest('.dropdown')) {
            const navbarCollapse = document.getElementById('navbarNav');
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
        }
    });
});

// Tutup menu saat klik di luar menu
document.addEventListener('click', function (event) {
    const isClickInsideNavbar = document.querySelector('.navbar').contains(event.target);
    if (!isClickInsideNavbar) {
        const navbarCollapse = document.getElementById('navbarNav');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
    }
});
