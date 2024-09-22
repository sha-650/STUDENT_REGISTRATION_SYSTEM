document.addEventListener("DOMContentLoaded", function () {
    const registerSection = document.getElementById("registerSection");
    const studentsSection = document.getElementById("studentsSection");

    const registerLink = document.getElementById("registerLink");
    const studentsLink = document.getElementById("studentsLink");

    // Function to show/hide sections
    function showSection(sectionToShow) {
        if (sectionToShow === "register") {
            registerSection.classList.remove("hidden");
            studentsSection.classList.add("hidden");
            registerLink.classList.add("active");
            studentsLink.classList.remove("active");
        } else if (sectionToShow === "students") {
            registerSection.classList.add("hidden");
            studentsSection.classList.remove("hidden");
            registerLink.classList.remove("active");
            studentsLink.classList.add("active");
        }
    }

    showSection("register");

    registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("register");
    });

    studentsLink.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("students");
    });

    document.getElementById("registrationForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const className = document.getElementById("class").value;
        const contact = document.getElementById("contact").value;

        if (!fullname || !email || !className || !contact) {
            alert("All fields are required.");
            return;
        }

        const student = {
            fullname,
            email,
            className,
            contact
        };

        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));

        this.reset();

        displayStudents();

        showSection("students");
    });

    function displayStudents() {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        const studentTableBody = document.querySelector("#studentTable tbody");

        studentTableBody.innerHTML = "";

        students.forEach((student, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td data-label="Full Name">${student.fullname}</td>
                <td data-label="Email">${student.email}</td>
                <td data-label="Class">${student.className}</td>
                <td data-label="Contact">${student.contact}</td>
                <td class="actions" data-label="Actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;

            studentTableBody.appendChild(row);
        });
    }

    // Function to delete a student
    window.deleteStudent = function (index) {
        let students = JSON.parse(localStorage.getItem("students"));
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    };

    // Function to edit a student
    window.editStudent = function (index) {
        let students = JSON.parse(localStorage.getItem("students"));
        const student = students[index];

        document.getElementById("fullname").value = student.fullname;
        document.getElementById("email").value = student.email;
        document.getElementById("class").value = student.className;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();

        // Switch to the Register form to edit the student
        showSection("register");
    };

    // Initial display of students
    displayStudents();
});
