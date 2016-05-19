/* This is a mini-project for the JavaScript Design Patterns unit. 
 * The model contains student data. The octopus defines functions 
 * that are called by event listeners in the view.
*/

// Wait for document to finish loading before running the enclosed functions
$(function(){

/* ----------------------------------------------------------------- */

    var model = {

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
                absences: 4
            },
            {
                name: 'Paulrus the Walrus',
                id: 'paulrus',
                absences: 3
            },
            {
                name: 'Gregory the Goat',
                id: 'gregory',
                absences: 8
            },
            {
                name: 'Adam the Anaconda',
                id: 'adam',
                absences: 5
            },
            {
                name: 'Shaun the Sheep',
                id: 'shaun',
                absences: 3
            }
        ],

        // Create an array for the number of attendance days
        days: Array.from({length: 13})

    };

/* ----------------------------------------------------------------- */

    var octopus = {

        // Set current student to the first in the array; tell view to load
        init: function() {
            model.currentStudent = model.students[0];
            view.init();
        },

        // Set chosen cat to match what the user clicks on in the list view
        setCurrentStudent: function(student) {
            model.currentStudent = student;
        },

        // Get student names and absence totals from the model
        getStudents: function() {
            return model.students;
        },

        // Get the attendance days from the model
        getDays: function() {
            return model.days;
        },

        // Get absences
        getAbsences: function() {
            return model.students.absences;
        }
    };

/* ----------------------------------------------------------------- */

    var view = {

        // On load, prepare table elements and call the view render function
        init: function() {
            this.tableHead = document.getElementById('thead');
            this.tableBody = document.getElementById('tbody');
            this.render();
        },

        render: function() {

            // Create the header row
            var header = document.createElement('tr');
            this.tableHead.appendChild(header);

            // Create the number cell in the header row
            var numberHeader = document.createElement('th');
            numberHeader.className = 'name-col';
            numberHeader.innerHTML = 'No.';
            header.appendChild(numberHeader);

            // Create the Student cell in the header row
            var studentHeader = document.createElement('th');
            studentHeader.className = 'name-col';
            studentHeader.innerHTML = 'Student';
            header.appendChild(studentHeader);

            // Create a cell for every day in the header row
            var days = octopus.getDays();
            for (var d = 1; d < days.length; d++) {
                var numDays = document.createElement('th');
                numDays.innerHTML = d;
                header.appendChild(numDays);
            }

            // Create an Absences cell in the header row
            var absenceCol = document.createElement('th');
            absenceCol.className = 'absent-col';
            absenceCol.innerHTML = 'Absences';
            header.appendChild(absenceCol);

            // Tell octopus to get the students array; loop through the array
            var students = octopus.getStudents();
            for (var i = 0; i < students.length; i++) {
                var student = students[i];

                // Create a row for every student
                var studentRow = document.createElement('tr');
                var studentRowId = student.id;
                studentRow.setAttribute('id', studentRowId);
                this.tableBody.appendChild(studentRow);

                // Create a cell for the student's number in every row
                var studentNumber = document.createElement('td');
                studentNumber.className = 'name-col';
                studentNumber.innerHTML = (i + 1) + '.';
                studentRow.appendChild(studentNumber);

                // Create a cell for the student's name in every row
                var studentName = document.createElement('td');
                studentName.className = 'name-col';
                studentName.innerHTML = student.name;
                studentRow.appendChild(studentName);

                // Create a cell with a checkbox for each day in every row
                for (var a = 1; a < days.length; a++) {
                    var studentDay = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'attendance[]';
                    checkbox.setAttribute('id', (student.id + a));
                    studentDay.appendChild(checkbox);
                    studentRow.appendChild(studentDay);
/*
                    // When user clicks on name, tell octopus to set chosen cat
                    checkbox.addEventListener('click', (function(studentCopy) {
                        return function() {
                            octopus.setCurrentStudent();
                            var count = octopus.getAbsences(studentCopy);
                            console.log(count);
                            if (this.checked) {
                                count++;
                            } else {
                                count--;
                            }
                            var checked = $(studentRow).children('td').children('input:checkbox(:checked)');
                            var numChecked = checked.length;
                            console.log(studentCopy.name, numChecked);
                        };
                    })(student));
*/
                    // On checkbox click, invoke function on that student and day
                    $('input').on('click', (function(icopy, acopy) {
                        return function() {
                            console.log(this.id);
                        }
                    })(i,a));
                }

                // Create an Absences cell in every row
                var daysMissed = document.createElement('td');
                daysMissed.className = 'absent-col';
                daysMissed.innerHTML = student.absences;
                studentRow.appendChild(daysMissed);
            }
        }
    };

/* ----------------------------------------------------------------- */

    // Load the octopus
    octopus.init();
});
