// Wait for the page to load
window.onload = function() {
    // Get all submenu parent items
    const submenus = document.querySelectorAll('.has-submenu');
    
    // Add click event to each submenu parent
    submenus.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // Prevent the link from navigating
            e.preventDefault();
            
            // Toggle the 'open' class
            this.classList.toggle('open');
            
            // Close other open submenus 
            submenus.forEach(function(other) {
                if (other !== item) {
                    other.classList.remove('open');
                }
            });
        });
    });

    // Update attendance button event listeners
    const clockInBtn = document.getElementById('clockInBtn');
    const clockOutBtn = document.getElementById('clockOutBtn');

    // Clock In/Out functionality
    clockInBtn.addEventListener('click', () => {
        const now = new Date();
        document.getElementById('clockInTime').textContent = now.toLocaleTimeString();
        clockInBtn.disabled = true;
        clockOutBtn.disabled = false;
    });

    clockOutBtn.addEventListener('click', () => {
        const now = new Date();
        document.getElementById('clockOutTime').textContent = now.toLocaleTimeString();
        clockOutBtn.disabled = true;

        // Calculate total hours (simplified)
        const clockInTime = document.getElementById('clockInTime').textContent;
        const clockIn = new Date(`1/1/2024 ${clockInTime}`);
        const totalMs = now - clockIn;
        const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('totalHours').textContent = `${totalHours}h ${totalMinutes}m`;
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');

            // Hide all pages
            document.querySelectorAll('.content > div').forEach(page => {
                page.style.display = 'none';
            });

            // Show the target page
            document.getElementById(targetId).style.display = 'block';

            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');
        });
    });

    // Set the initial active link based on the displayed section
    const initialPage = document.querySelector('.content > div[style*="display: block"]');
    if (initialPage) {
        const activeLink = Array.from(navLinks).find(link => link.getAttribute('data-target') === initialPage.id);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
};
