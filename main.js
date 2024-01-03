

var tutorApi='http://localhost:3000/tutors';
var currentPage = 0;
var tutorsPerPage = 10;


function start() {
    getTutors(function(tutors) {
        renderTutors(tutors);
        displayNumberOfTutors(tutors);
    });


    // getTutors(renderTutors);
    handleCreateForm();
}

start();

// functions

function getTutors(callback) {
    // fetch(tutorApi) 
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(callback);   
    fetch(tutorApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(tutors) {
      callback(tutors);
      renderPagination(tutors);
    });
}

function renderTutors(tutors) {
    var listTutorBlock = document.querySelector('#tutor');
    var startIndex = currentPage * tutorsPerPage;
    var endIndex = startIndex + tutorsPerPage;
    var currentTutors = tutors.slice(startIndex, endIndex);
    var theadHtml = `
        <thead>
            <tr>
                <td>ID</td>
                <td>Tên</td>
                <td>Số điện thoại</td>
                <td>Email</td>
                <td>Chi tiết</td>
                <td>Edit</td>
            </tr>
        </thead>
        `;
    var htmls = currentTutors.map(function(currentTutor){
        return `
            <tr>
                <td>${currentTutor.id}</td>
                <td>${currentTutor.Name}</td>
                <td>${currentTutor.Tel}</td>
                <td>${currentTutor.Email}</td>
                <td>${currentTutor.Detail}</td>
                <td><button onclick="deleteTutor(${currentTutor.id})">Xóa</button></td>
            </tr>
        `;
    });
    listTutorBlock.innerHTML = (theadHtml+htmls.join(''));
   
}




// document.addEventListener('DOMContentLoaded', function () {
//     // Lấy phần tử có class "number"
//     const numberElement = document.querySelector('.number');

//     // Tạo một phần tử mới (ví dụ: một thẻ p)
//     const newElement = document.createElement('p');
//     newElement.innerText ='dsa';

//     // Thêm phần tử mới vào phần tử có class "number"
//     numberElement.appendChild(newElement);
// });
function displayNumberOfTutors(tutors) {
    var numberOfTutors = countTutors(tutors);
    var numberElement = document.querySelector('.number');
    if (numberElement) {
        // Xóa nội dung hiện tại của phần tử có class "number"
        numberElement.innerHTML = '';

        // Tạo một phần tử mới (ví dụ: một thẻ p)
        const newElement = document.createElement('p');
        newElement.innerText = ` ${numberOfTutors}`;

        // Thêm phần tử mới vào phần tử có class "number"
        numberElement.appendChild(newElement);
    }
}

function countTutors(tutors) {
    return tutors.length;
}

function createTutor(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(tutorApi, options) 
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick= function() {
        var Name = document.querySelector('input[name="name"]').value;
        var Email = document.querySelector('input[name="Email"]').value;
        var Tel = document.querySelector('input[name="Tel"]').value;

        var formData= {
            Name: Name,
            Email: Email,
            Tel: Tel
            
        };
        createTutor(formData);
    }
}


function deleteTutor(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(tutorApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Delete successful:', data);
            getTutors(renderTutors);
        })
        .catch(function(error) {
            console.error('Error deleting tutor:', error);
        });
}

function searchUser() {
    // Lấy giá trị từ ô tìm kiếm
    let valueSearchByInput = document.getElementById('search').value;

    // Gọi hàm getTutors để lấy danh sách người hướng dẫn
    getTutors(function(tutors) {
        // Sử dụng filter để lọc người hướng dẫn theo giá trị tìm kiếm
        let userSearch = tutors.filter(function(value) {
            return value.Name.toUpperCase().includes(valueSearchByInput.toUpperCase());
        });

        // Hiển thị kết quả tìm kiếm
        renderTutors(userSearch);
        console.log(userSearch);
    });
}


function renderPagination(tutors) {
    var paginationBlock = document.getElementById('pagination');
    paginationBlock.innerHTML = '';

    var pageCount = Math.ceil(tutors.length / tutorsPerPage);

    for (var i = 0; i < pageCount; i++) {
      var pageButton = document.createElement('button');
      pageButton.innerText = i + 1;
      pageButton.addEventListener('click', function(event) {
        currentPage = parseInt(event.target.innerText) - 1;
        getTutors(renderTutors);
      });
      paginationBlock.appendChild(pageButton);
    }
  }

