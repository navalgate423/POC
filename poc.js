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

    // Function to update the date and time
    function updateDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('attendanceDate').textContent = `DATE: ${now.toLocaleDateString('en-US', options)}`;
        document.getElementById('attendanceTime').textContent = `TIME: ${now.toLocaleTimeString()}`;
    }

    // Update date and time every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call to set the date and time immediately

    // Button functionality
    const clockInBtn = document.getElementById('clockInBtn');
    const clockOutBtn = document.getElementById('clockOutBtn');
    const breakBtn = document.getElementById('breakBtn');
    const setScheduleBtn = document.getElementById('setScheduleBtn');

    // Clock In functionality
    clockInBtn.addEventListener('click', () => {
        // Logic for clocking in
        alert("Clocked In!"); // Placeholder for clock in functionality
        clockInBtn.disabled = true;
        breakBtn.disabled = false;
        clockOutBtn.disabled = false;
    });

    // Clock Out functionality
    clockOutBtn.addEventListener('click', () => {
        // Logic for clocking out
        alert("Clocked Out!"); // Placeholder for clock out functionality
        clockOutBtn.disabled = true;
        breakBtn.disabled = true;
    });

    // Break functionality
    breakBtn.addEventListener('click', () => {
        // Logic for taking a break
        alert("Break started!"); // Placeholder for break functionality
    });

    // Set Schedule functionality
    setScheduleBtn.addEventListener('click', () => {
        // Logic for setting a schedule
        alert("Set Schedule!"); // Placeholder for set schedule functionality
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
