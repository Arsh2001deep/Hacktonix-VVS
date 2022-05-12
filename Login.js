console.log("Joined");
let name1;
let email;
let password;



document.getElementById('signup').addEventListener('click', () => {
    location.href = 'http://127.0.0.1:5500/Signup.html';
})

document.getElementById('email').addEventListener('input', (e) => {
    email = e.target.value;
    console.log(email);
});
document.getElementById('password').addEventListener('input', (e) => {
    password = e.target.value;
});


document.getElementById('submit').addEventListener('click',async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    const json = await response.json();
    console.log(json);
    if(json.success == true) {
        location.href = 'http://127.0.0.1:5500/exam.html';

    }
    else {
        let element = document.getElementById('container');
        element.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error:</strong> Try to login with correct Credentials
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});
