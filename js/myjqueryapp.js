/* This is a mini-project for the JavaScript Design Patterns unit. 
 * The model contains all data needed. The octopus defines functions 
 * that are called by functions in the day, student and absence views. 
 * Credit goes to the person who made his or her repository available 
 * at <http://qqyoungqq.github.io/school-attendance/>.
*/

// Wait for document to finish loading before running the enclosed functions
$(function(){

    /* ----------------------------------------------------------------- */

    var model = {

        // Student names, initial number of checked boxes, initial days attended
        students: [
            {
                name: 'Slappy the Frog',
                checkedBoxes : [],
                attendance: 0
            },
            {
                name: 'Lilly the Lizard',
                checkedBoxes : [],
                attendance: 0
            },
            {
                name: 'Paulrus the Walrus',
                checkedBoxes : [],
                attendance: 0
            },
            {
                name: 'Gregory the Goat',
                checkedBoxes : [],
                attendance: 0
            },
            {
                name: 'Adam the Anaconda',
                checkedBoxes : [],
                attendance: 0
            },
            {
                name: 'Shaun the Sheep',
                checkedBoxes : [],
                attendance: 0
            }
        ],

        // Number of attendance days
        days : 12,

        // Generate an array of random numbers to make checkmarks
        genChecks: function(c) {
            var checks = [];
            for (var i = 1; i <= c; i++) {
                var randomNumber = Math.round(Math.random());
                checks.push(randomNumber);
            }
            return checks;
        }
    };

    /* ----------------------------------------------------------------- */

    var octopus = {

        // Load checkmarks and attendance totals; tell views to load
        init: function() {
            this.getGenChecks();
            dayView.init();
            studentView.init();
            absenceView.init();
        },

        // Get student data from model
        getStudents: function() {
            return model.students;
        },

        // Get attendance days from model
        getDays: function() {
            return model.days;
        },

        // Check if a checkbox is checked
        checkTrue: function(c) {
            if ( c === true ) {
                return 'checked';
            } else {
                return '';
            }
        },

        // Tell model to run random-number generator to make checkmarks
        getGenChecks: function() {

            // For each student, run generator on each day; start attendance at 0
            for (var i = 0; i < model.students.length; i++) {
                var checks = model.genChecks(model.days);
                var attendance = 0;

                // For each day, if checkbox is checked, increment attendance
                for (var j = 0; j < model.days; j++) {
                    if (checks[j] === true) {
                        attendance++;
                    }
                }

                // Set student's checkboxes and attendance as results of above
                model.students[i].checkedBoxes = checks;
                model.students[i].attendance = attendance;
            }
        },

        // Update the data for every student and every day in the model
        updateStudentData: function(i,j) {

            // Decrease attendance if box unchecked; increase if box checked
            if (model.students[i].checkedBoxes[j] === true) {
                model.students[i].checkedBoxes[j] = false;
                model.students[i].attendance--;
            } else { 
                model.students[i].checkedBoxes[j] = true; 
                model.students[i].attendance++;
            }
        }
    };

    /* ----------------------------------------------------------------- */

    var dayView = {

        // On load, call the day-view render function
        init: function() {
            this.render();
        },

        render: function() {

            // Append head a header row with No. and Student cells to the table
            $('thead').append('<tr id="header-row"></tr>');
            $('#header-row').append('<th class="name-col">' + 'No.' + '</th>');
            $('#header-row').append('<th class="name-col">' + 'Student' + '</th>');

            // Tell octopus to get days from model; append each day to header row
            var schoolDays = octopus.getDays();
            for (var d = 1; d <= schoolDays; d++) {
                $('#header-row').append('<th>' + d + '</th>');
            }

            // Append Present and Absent cells to the header row
            $('#header-row').append('<th class="present-col">' + 'P' + '</th>');
            $('#header-row').append('<th class="absent-col">' + 'A' + '</th>');
        }
    };

    /* ----------------------------------------------------------------- */

    var studentView = {

        // On load, empty table body and call student-view render function
        init: function() {
            $('tbody').empty();
            this.render();
        },

        render: function() {

            // Tell octopus to get the array of students and days from model
            var students = octopus.getStudents();
            var schoolDays = octopus.getDays();

            // For each student in the array
            for (var i = 0; i < students.length; i++) {

                // Append row to table body; make its id the student's index + 1
                $('tbody').append('<tr class="student" id=s' + (i+1).toString() + '>' + '</tr>');

                // Append cells for number and name to the last student row
                $('.student:last').append('<td class="name-col">' + (i+1) + '.</td>');
                $('.student:last').append('<td class="name-col">' + students[i].name + '</td>');

                // For each day in the student's row
                for (var j = 0; j < schoolDays; j++) {

                    // Tell octopus to check if the checkbox is checked
                    var checkbox = octopus.checkTrue(students[i].checkedBoxes[j]);

                    // Set id as student index * number of days + day index
                    var checkboxId = i * schoolDays + j;

                    // Append to row a cell with the above id and a checkbox
                    $('#s' + (i+1).toString()).append('<td class="day-col">' + '<input type="checkbox" id=' + checkboxId.toString() + " " + checkbox + '>' + '</td>');

                    // On checkbox click, invoke function on the student and day
                    $('#' + checkboxId.toString()).click((function(icopy,jcopy) {   
                        return function() {

                            // Update the model and reload the student view
                            octopus.updateStudentData(icopy,jcopy);
                            studentView.init();
                        };
                    })(i,j));
                }

                // Append Present and Absent cells to the last student row
                $('.student:last').append('<td class="present-col">' + students[i].attendance + '</td>');
                $('.student:last').append('<td class="absent-col"><span style="display:none;">' + (model.days - students[i].attendance) + '</span></td>');
            }
        }
    };

    /* ----------------------------------------------------------------- */

    var absenceView = {

        // On load, call the absence-view hide function
        init: function() {
            this.render();
        },

        render: function() {

            // Show the contents of all cells containing absence totals
            $('button').click(function() {
                $('tbody span').toggle();
            });
        }
    };

/* ----------------------------------------------------------------- */

    // Load the octopus
    octopus.init();
});
