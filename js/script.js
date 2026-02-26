
let currentUser = localStorage.getItem('currentUser');
if (!currentUser && !window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

let tasks = [];
let courses = [];

if (currentUser) {

    tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    courses = JSON.parse(localStorage.getItem(`courses_${currentUser}`)) || [];
}


function saveData() {
    if (currentUser) {
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
        localStorage.setItem(`courses_${currentUser}`, JSON.stringify(courses));
    }
}

if (window.location.href.includes('login.html')) {

    if (currentUser) window.location.href = 'dashboard.html';

    document.getElementById('loginForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // "Password must be at least 6 characters" 
        const errorMsg = document.getElementById("loginError");

        if (password.length < 6) {
            errorMsg.style.display = "block";
            return;
        } else {
            errorMsg.style.display = "none";
        }

        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    });
}

if (window.location.href.includes('dashboard.html')) {

    setInterval(function () {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);


    const announcements = [
        "Small progress every day leads to big results.",
        "Focus on improvement, not perfection.",
        "Your future self will thank you for studying today.",
        "Discipline is choosing what you want most.",
        "Learning never stops. Neither should you."
    ];
    let currentAnnouncementIndex = 0;

    const announcementEl = document.getElementById('announcementText');
    if (announcementEl) announcementEl.innerText = announcements[0];

    document.getElementById('nextAnnouncement')?.addEventListener('click', function () {
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
        announcementEl.innerText = announcements[currentAnnouncementIndex];
    });
    document.getElementById('statTotalTasks').innerText = tasks.length;
    document.getElementById('statCompletedTasks').innerText = tasks.filter(t => t.completed).length;
    document.getElementById('statPendingTasks').innerText = tasks.filter(t => !t.completed).length;
    document.getElementById('statTotalCourses').innerText = courses.length;
}
if (window.location.href.includes('tasks.html')) {

    function renderTasks(searchText = "", sortBy = "") {
        const list = document.getElementById('taskList');
        list.innerHTML = "";

        let filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchText.toLowerCase()));
        if (sortBy === 'priority') {
            const weights = { 'High': 1, 'Medium': 2, 'Low': 3 };
            filteredTasks.sort((a, b) => weights[a.priority] - weights[b.priority]);
        } else if (sortBy === 'date') {
            filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        filteredTasks.forEach(task => {
            const div = document.createElement('div');
            div.className = `list-item ${task.completed ? 'completed' : ''}`;
            div.innerHTML = `
                <div>
                    <strong>${task.title}</strong><br>
                    <small>Due: ${task.date} | Priority: ${task.priority} | Status: ${task.completed ? 'Done' : 'Not Done'}</small>
                </div>
                <div class="flex-row" style="margin:0;">
                    <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Mark Complete'}</button>
                    <button class="danger-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    // Add Task 
    document.getElementById('addTaskForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        tasks.push({
            id: Date.now(),
            title: document.getElementById('taskTitle').value,
            date: document.getElementById('taskDate').value,
            priority: document.getElementById('taskPriority').value,
            completed: false
        });
        saveData();
        e.target.reset();
        renderTasks(document.getElementById('searchInput').value, document.getElementById('sortSelect').value);
    });


    document.getElementById('searchInput')?.addEventListener('input', function (e) {
        renderTasks(e.target.value, document.getElementById('sortSelect').value);
    });


    document.getElementById('sortSelect')?.addEventListener('change', function (e) {
        renderTasks(document.getElementById('searchInput').value, e.target.value);
    });


    window.toggleTask = function (id) {
        const task = tasks.find(t => t.id === id);
        if (task) task.completed = !task.completed;
        saveData();
        renderTasks(document.getElementById('searchInput').value, document.getElementById('sortSelect').value);
    };


    window.deleteTask = function (id) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks = tasks.filter(t => t.id !== id);
            saveData();
            renderTasks(document.getElementById('searchInput').value, document.getElementById('sortSelect').value);
        }
    };

    renderTasks();
}

if (window.location.href.includes('courses.html')) {

    function renderCourses() {
        const list = document.getElementById('courseList');
        list.innerHTML = "";
        courses.forEach(course => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div><strong>${course.name}</strong> - Instructor: ${course.instructor}</div>
                <button class="danger-btn" onclick="deleteCourse(${course.id})">Delete</button>
            `;
            list.appendChild(div);
        });
    }

    document.getElementById('addCourseForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        courses.push({
            id: Date.now(),
            name: document.getElementById('courseName').value,
            instructor: document.getElementById('courseInstructor').value
        });
        saveData();
        e.target.reset();
        renderCourses();
    });

    window.deleteCourse = function (id) {
        if (confirm("Are you sure you want to delete this course?")) {
            courses = courses.filter(c => c.id !== id);
            saveData();
            renderCourses();
        }
    };

    renderCourses();
}

if (window.location.href.includes('profile.html')) {
    document.getElementById('usernameInput').value = currentUser;

    document.getElementById('profileForm')?.addEventListener('submit', function (e) {
        e.preventDefault();

        const newUsername = document.getElementById('usernameInput').value.trim();
        const successMsg = document.getElementById('profileSuccess');

        if (newUsername !== "" && newUsername !== currentUser) {
            localStorage.setItem(`tasks_${newUsername}`, JSON.stringify(tasks));
            localStorage.setItem(`courses_${newUsername}`, JSON.stringify(courses));
            localStorage.removeItem(`tasks_${currentUser}`);
            localStorage.removeItem(`courses_${currentUser}`);
            localStorage.setItem('currentUser', newUsername);

            successMsg.style.display = 'block';

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    });
}
