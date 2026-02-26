 **Student LMS (Learning Management System)
A simple and interactive Student Learning Management System (LMS) built using HTML, CSS, and JavaScript.
The project focuses on user management, courses, tasks, and announcements with a clean UI and browser-based storage.

** Features
* Authentication
Login system using LocalStorage
Password validation (minimum length)
Error messages displayed inline (no alerts)
* User Profile
Update username dynamically
User data (tasks & courses) preserved when username changes
Green success messages instead of alerts
* Courses Management
Add and display courses per user
Data stored separately for each user
* Tasks Management
Add, view, and manage tasks
Tasks linked to the logged-in user only
*Announcements
Customizable announcements section
Dynamic content (Welcome messages, updates, etc.)
UI Enhancements
Modern layout
Inline validation messages (red for errors, green for success)
User-friendly navigation
*Technologies Used
HTML5
CSS3
JavaScript (Vanilla JS)
LocalStorage API
**Project Structure
Student-LMS/
│
├── Login.html       
├── profile.html      
├── dashboard.html
|__ tasks.html
|__courses.html    
│
├── css/
│   └── style.css
│
├── js/
│   ├─script.js
│
└── README.md
** How to Run the Project
Clone the repository:
git clone https://github.com/your-username/student-lms.git
Open login.html in your browser
(No server or backend required)
**Key Concepts Covered
DOM Manipulation
Event Handling
Form Validation
Browser Storage (LocalStorage)
Modular JavaScript Structure
**Future Improvements
Add backend (Node.js / Firebase)
User roles (Admin / Student)
Progress tracking
Responsive mobile design
** Author
Ahmed Omar
