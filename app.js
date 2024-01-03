var tutor = 'http://localhost:3000/tutors';
fetch(tutor)
    .then(function(response) {
        return response.json();
    })
    .then(function(tutor){
        console.log(tutor);
    });