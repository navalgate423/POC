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
    const returnFromBreakBtn = document.getElementById('returnFromBreakBtn');
    const attendanceBody = document.getElementById('attendanceBody');

    let clockInTime = null;
    let clockOutTime = null;
    let breakStartTime = null;
    let breakDuration = 0; // in minutes

    // Clock In functionality
    clockInBtn.addEventListener('click', () => {
        const now = new Date();
        clockInTime = now;
        const day = now.toLocaleDateString('en-US', { weekday: 'long' });
        const clockInFormatted = now.toLocaleTimeString();

        // Add a new row to the attendance table
        const newRow = `
            <tr>
                <td>1</td>
                <td>${day}</td>
                <td>${clockInFormatted}</td>
                <td>--:--</td>
                <td>0:00</td>
                <td>0:00</td>
                <td>0:00</td>
                <td>0:00</td>
                <td>0:00</td>
                <td><button class="action-btn">Edit</button></td>
            </tr>
        `;
        attendanceBody.innerHTML = newRow;

        // Enable buttons
        breakBtn.disabled = false;
        clockOutBtn.disabled = false;
        clockInBtn.disabled = true;
    });

    // Break functionality
    breakBtn.addEventListener('click', () => {
        breakStartTime = new Date();
        alert("Break started!"); // Placeholder for break functionality
        breakBtn.disabled = true;
        returnFromBreakBtn.disabled = false;
    });

    // Return from Break functionality
    returnFromBreakBtn.addEventListener('click', () => {
        const now = new Date();
        const breakEndTime = now;
        breakDuration = Math.floor((breakEndTime - breakStartTime) / 60000); // Break duration in minutes

        // Update the last row in the attendance table
        const lastRow = attendanceBody.querySelector('tr');
        if (lastRow) {
            const breakCell = lastRow.cells[4]; // Break column
            breakCell.textContent = `${breakDuration}:00`; // Update break duration
        }

        alert("Returned from break!"); // Placeholder for return from break functionality
        returnFromBreakBtn.disabled = true;
        breakBtn.disabled = false;
    });

    // Clock Out functionality
    clockOutBtn.addEventListener('click', () => {
        const now = new Date();
        clockOutTime = now;
        const clockOutFormatted = now.toLocaleTimeString();

        // Update the last row in the attendance table
        const lastRow = attendanceBody.querySelector('tr');
        if (lastRow) {
            lastRow.cells[3].textContent = clockOutFormatted; // Update clock out time

            // Calculate total working hours
            const totalWorkingMinutes = Math.floor((clockOutTime - clockInTime) / 60000) - breakDuration; // Subtract break duration
            const workingHours = Math.floor(totalWorkingMinutes / 60);
            const workingMinutes = totalWorkingMinutes % 60;

            lastRow.cells[7].textContent = `${workingHours}h ${workingMinutes}m`; // Update working hours
        }

        alert("Clocked Out!"); // Placeholder for clock out functionality
        clockOutBtn.disabled = true;
        breakBtn.disabled = true;
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

    // Tab functionality for VA Leave Request
    const tabButtons = document.querySelectorAll('.tab-button');
    const leaveBody = document.getElementById('leaveBody');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');

            // Update the leave table based on the selected tab
            const target = this.getAttribute('data-target');
            updateLeaveTable(target);
        });
    });

    // Function to update the leave table based on the selected tab
    function updateLeaveTable(status) {
        // Clear the current table body
        leaveBody.innerHTML = '';

        // Example data (you can replace this with actual data)
        const leaveData = {
            pending: [
                { name: 'John Doe', type: 'Sick Leave', submitted: '2023-10-01', shiftDate: '2023-10-05', reason: 'Flu', proof: 'N/A', leaveStatus: 'Pending', approverStatus: 'N/A', action: 'Review' },
            ],
            approved: [
                { name: 'Jane Smith', type: 'Vacation', submitted: '2023-09-15', shiftDate: '2023-09-20', reason: 'Family Trip', proof: 'N/A', leaveStatus: 'Approved', approverStatus: 'Approved', action: 'View' },
            ],
            declined: [
                { name: 'Alice Johnson', type: 'Personal Leave', submitted: '2023-09-10', shiftDate: '2023-09-12', reason: 'Personal Reasons', proof: 'N/A', leaveStatus: 'Declined', approverStatus: 'Declined', action: 'View' },
            ],
        };

        // Populate the table based on the selected status
        leaveData[status].forEach(leave => {
            const row = `
                <tr>
                    <td>${leave.name}</td>
                    <td>${leave.type}</td>
                    <td>${leave.submitted}</td>
                    <td>${leave.shiftDate}</td>
                    <td>${leave.reason}</td>
                    <td>${leave.proof}</td>
                    <td>${leave.leaveStatus}</td>
                    <td>${leave.approverStatus}</td>
                    <td><button class="action-btn">${leave.action}</button></td>
                </tr>
            `;
            leaveBody.innerHTML += row;
        });

        // If no data, show a message
        if (leaveData[status].length === 0) {
            leaveBody.innerHTML = '<tr><td colspan="9" style="text-align: center;">No data available</td></tr>';
        }
    }

    // Initialize the table with pending data
    updateLeaveTable('pending');
};
