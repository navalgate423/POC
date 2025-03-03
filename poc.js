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

    // Attendance Modal functionality
    const modal = document.getElementById('attendanceModal');
    const attendanceBtn = document.querySelector('.attendance-btn');
    const closeBtn = document.querySelector('.close-modal');
    const clockInBtn = document.getElementById('clockInBtn');
    const clockOutBtn = document.getElementById('clockOutBtn');

    // Update time and date
    function updateDateTime() {
        const now = new Date();
        document.getElementById('currentTime').textContent = now.toLocaleTimeString();
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Modal controls
    attendanceBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

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
};
