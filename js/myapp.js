// Create attendance objects consisting of student names and 12 days
(function() {

    // If localStorage has no attendance property, log the console message
    // Calculate a random number no less than 0.5 rounded down
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        // Select all elements in the table body with the class name "name-col"
        // Create an empty 'attendance' object
        var nameColumns = $('tbody .name-col'),
            attendance = {};

        // Loop over each "name-col" element (https://api.jquery.com/each/)
        // Define the inner text of the "name-col" element as 'name'
        // Create an empty array for the name in the attendance object
        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            // Loop over the name array 11 times; add the random number to it
            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        // Convert the attendance object into text for the user view
        localStorage.attendance = JSON.stringify(attendance);
    }
}());

/* ----------------------------------------------------------------- */

// Wait for document to finish loading before running the enclosed functions
$(function() {

    // Define 'attendance' as the attendance property of localStorage
    // Select all elements in the table body with the class name "missed-col"
    // Select all input elements in the table body
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Define a function to count each student's missed days
    // Loop over each "missed-col" element and run the enclosed function
    // Go up one level to select the immediate table-row parent
    // Select the input elements inside the cells inside that row
    // Define the initial number of missed days as 0
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            // Loop over each input element; if unchecked, increment missed days
            // http://api.jquery.com/prop/
            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            // Set result of above as the text of the "missed-col" element
            // http://www.w3schools.com/jquery/html_text.asp
            $(this).text(numMissed);
        });
    }

    /* ----------------------------------------------------------------- */
    
    // Loop over each attendance object; run enclosed function on name and days
    // Select the row of the "name-col" element that contains a name
    // Select the input elements inside the "attend-col" elements in that row
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        // Loop over each input element, add 'checked' property, call it a day
        // http://api.jquery.com/prop/#prop-propertyName-function
        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    /* ----------------------------------------------------------------- */
    
    // On checkbox click, select "student" elements; make 'newAttendance' object
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        // Loop over each student row and run the enclosed function
        // Define the text inside the "name-col" element of the row as 'name'
        // Select the input elements inside the cells inside the row
        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            // Create an empty array for the name in the newAttendance object
            newAttendance[name] = [];

            // Loop over each checkbox in the table body
            // Select those with a 'checked' property; add to the name array
            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        // Run the function that counts each student's missed days
        // Convert 'newAttendance' into text; update 'attendance' in localStorage
        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    // Run the function that counts each student's missed days
    countMissing();
}());
