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

        // Keep submenu open on hover
        item.addEventListener('mouseenter', function() {
            this.classList.add('open');
        });

        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.classList.remove('open');
            }
        });
    });

    // Update attendance button event listeners
    const clockInBtn = document.getElementById('clockInBtn');
    const clockOutBtn = document.getElementById('clockOutBtn');
    const breakBtn = document.getElementById('breakBtn');
    const statusIndicator = document.getElementById('statusIndicator');

    // Clock In functionality
    clockInBtn.addEventListener('click', () => {
        const now = new Date();
        document.getElementById('clockInTime').textContent = now.toLocaleTimeString();
        document.getElementById('attendanceDay').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
        
        // Show the status indicator
        statusIndicator.style.display = 'flex';

        // Enable the break button
        breakBtn.disabled = false;

        // Disable the clock in button
        clockInBtn.disabled = true;
        clockOutBtn.disabled = false;
    });

    // Clock Out functionality
    clockOutBtn.addEventListener('click', () => {
        const now = new Date();
        document.getElementById('clockOutTime').textContent = now.toLocaleTimeString();
        clockOutBtn.disabled = true;

        // Calculate total worked hours (simplified)
        const clockInTime = document.getElementById('clockInTime').textContent;
        const clockIn = new Date(`1/1/2024 ${clockInTime}`);
        const totalMs = now - clockIn;
        const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('workedHours').textContent = `${totalHours}h ${totalMinutes}m`;

        // Disable the break button when clocking out
        breakBtn.disabled = true;
    });

    // Break functionality
    breakBtn.addEventListener('click', () => {
        // Logic for taking a break can be added here
        alert("Break started!"); // Placeholder for break functionality
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
