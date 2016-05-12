/* This is a mini-project for the JavaScript Design Patterns unit. 
 * The model contains student data. The octopus defines functions 
 * that are called by event listeners in the view.
*/

// Wait for document to finish loading before running the enclosed functions
$(function(){

    var model, octopus, view;

/* ----------------------------------------------------------------- */

    model = {

        // Define the current student as a null object by default
        currentStudent: null,

        // Store array of student names and initial absences
        students: [
            {
                name: 'Slappy the Frog',
                id: 'slappy',
                absences: 0
            },
            {
                name: 'Lilly the Lizard',
                id: 'lilly',
                absences: 0
            },
            {
                name: 'Paulrus the Walrus',
                id: 'paulrus',
                absences: 0
            },
            {
                name: 'Gregory the Goat',
                id: 'gregory',
                absences: 0
            },
            {
                name: 'Adam the Anaconda',
                id: 'adam',
                absences: 0
            },
            {
                name: 'Shaun the Sheep',
                id: 'shaun',
                absences: 0
            }
        ],
    };

/* ----------------------------------------------------------------- */

    octopus = {

        // Set current student to first in array; tell views to load
        init: function() {
            model.currentStudent = model.students[0];
            view.init();
        },

        // Get student names and absence totals from the model
        getStudents: function() {
            return model.students;
        }
    };

/* ----------------------------------------------------------------- */

    view = {

        // On load, prepare table body and call the view render function
        init: function() {
            this.tBody = document.getElementById('tbody');
            this.render();
        },

        render: function() {

            // Tell octopus to get the students array from the model
            var students = octopus.getStudents();

            // Loop over the array
            for (var i = 0; i < students.length; i++) {
                var student = students[i];

                // Create a row for every student
                var studentRow = document.createElement('tr');
                var studentRowId = student.id;
                studentRow.setAttribute('id', studentRowId);
                this.tBody.appendChild(studentRow);

                // Create a cell for the student's name in every row
                var studentName = document.createElement('td');
                studentName.className = 'name-col';
                studentName.innerHTML = students[i].name;
                studentRow.appendChild(studentName);

                // Create a cell with a checkbox for each day in every row
                for (var d = 0; d < 12; d++) {
                    var studentAttendance = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = studentRowId + d;
                    studentAttendance.appendChild(checkbox);
                    studentRow.appendChild(studentAttendance);
                }

                // Create an Absences cell in every row
                var absenceCol = document.createElement('td');
                absenceCol.className = 'absence-col';
                absenceCol.setAttribute('id', i);
                absenceCol.innerHTML = students[i].absences;
                studentRow.appendChild(absenceCol);
            }
        }
    };

/* ----------------------------------------------------------------- */

    // Load the octopus
    octopus.init();
});
