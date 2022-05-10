console.log("hello");

let name1;
let email;
let password;

document.getElementById('name').addEventListener('input', (e) => {
    name1 = e.target.value;
    console.log(name1);
});

document.getElementById('email').addEventListener('input', (e) => {
    email = e.target.value;
    console.log(email);
});
document.getElementById('password').addEventListener('input', (e) => {
    password = e.target.value;
});


document.getElementById('submit').addEventListener('click',async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/createuser", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:name1, email: email, password: password }),
    })
    const json = await response.json();
    console.log(json);
    if(json.success == true) {
        location.href = 'http://127.0.0.1:5500/exam.html';

    }
    else {
        let element = document.getElementById('container');
        element.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
       <strong>Error:</strong> This email id is already registered
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});