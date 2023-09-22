const myForm = document.getElementById('my-form')
const EmailInput = document.querySelector('#email');
const PasswordInput = document.querySelector('#pass');
const userEx = document.querySelector('#userEx');

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    const Email = EmailInput.value;
    const Password = PasswordInput.value;
    
    if (Email === '' || Password === '') {
        alert("Input all fields");
    } else {
        const formData = { Email: Email, Password: Password };
        await getFormData(formData);
        clearFields();
    }
}

async function getFormData(formData) {
    try {
        const response = await axios.get('http://localhost:4000/GetUser', { params: formData });
        const responseData = response.data;
       


        if (response.status === 200) {
            clearErrorMessages();
            alert('Login successfull')
          
            localStorage.setItem('token', responseData.token);
            window.location.href = `/html/chats.html?username=${responseData.User.Name}`;
       
         
            
        }
    } catch (err) {
        clearErrorMessages();
        if (err.response) {
            if (err.response.status === 404) {
                displayErrorMessage('User does not exist!');
            } else if (err.response.status === 401) {
                displayErrorMessage('Password incorrect!');
            } else {
                alert('An error occurred');
            }
        } else {
            alert('An error occurred');
        }
    }
}

function clearFields() {
    EmailInput.value = '';
    PasswordInput.value = '';
}
function clearErrorMessages() {
    while (userEx.firstChild) {
        userEx.removeChild(userEx.firstChild);
    }
}

function displayErrorMessage(message) {
    const h3 = document.createElement('h3');
    h3.className = 'h3';
    h3.textContent = message;
    userEx.appendChild(h3);
}

document.addEventListener("DOMContentLoaded", function() {
  
    document.getElementById('SignUpButton').addEventListener('click', function() {
        window.location.href = 'SignUp.html';
    });
    document.getElementById('PassReset').addEventListener('click', function() {
        window.location.href = 'PasswordReset.html';
    });
    



   
});
