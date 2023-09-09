


const SendBtn = document.getElementById('Send-btn');
const UserTextInput = document.getElementById('Text-input');
const Msglist = document.getElementById('User-msg-list');
const UserMsgDiv = document.getElementById('User-msg');


SendBtn.addEventListener('click', onSubmit);



function onSubmit(e) {
    e.preventDefault();
    const Messages = UserTextInput.value;

    if (UserTextInput.value === '') {
        alert("No Messeges Input");
    } else {
        const UserTextData = { Messages: Messages };
        postUserTextData(UserTextData);
        clearFields();
    }
}

async function postUserTextData(UserTextData) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:4000/UserMsg', UserTextData, {
            headers: {
                "Authorization": token
            }
        });

        const UserMsg = response.data;
        console.log(UserMsg);
        createListItem(UserMsg);
    } catch (err) {
        console.log(err);
    }
}
function clearFields() {
    UserTextInput.value = '';
}

async function createListItem(UserMsg) {
    try {
        const newListItem = document.createElement('li');
        newListItem.className='clearfix'
        const newMessage = document.createElement('div');
      newMessage.textContent = UserMsg.Messages;


        newMessage.className="message my-message"
        newMessage.id = 'User-msg';
        newMessage.style.display='inline-block'

        newListItem.appendChild(newMessage);
        Msglist.appendChild(newListItem);



    } catch (err) {
        console.log(err);
    }

}
document.addEventListener('DOMContentLoaded', function () {

GetUserTextData();

})

async function GetUserTextData() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:4000/GetUserMsg', {
            headers: {
                "Authorization": token
            }
        });

        const allUserMsg = response.data.Messages;
        console.log(allUserMsg);

        for (const UserMsgs of allUserMsg) {
            createListItem(UserMsgs);
          }

    } catch (err) {
        console.log(err);
    }
}
