


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


    //  setInterval(GetUserTextData,1000);      apply this in production
    GetUserTextData();
})
const MsgLimit = 50; 

async function GetUserTextData() {
    try {
        const token = localStorage.getItem('token');
        let allUserMsg = [];

        // Check if messages are cached in localStorage
        const LocalMessages = localStorage.getItem('cachedMessages');
        if (LocalMessages) {
            allUserMsg = JSON.parse(LocalMessages);
            
        }

        const response = await axios.get('http://localhost:4000/GetUserMsg', {
            headers: {
                "Authorization": token
            }
        });

        const newMessages = response.data.Messages;
      

         // Filter out messages with duplicate UUIDs and add unique messages to allUserMsg
         newMessages.forEach((newMessage) => {
            if (!allUserMsg.some((existingMessage) => existingMessage.Id === newMessage.Id)) {
                allUserMsg.push(newMessage);
            }
        });

        if (allUserMsg.length > MsgLimit) {
            const messagesToRemoveIndex = allUserMsg.length - MsgLimit;
            allUserMsg.splice(0, messagesToRemoveIndex);
        }

        
        localStorage.setItem('cachedMessages', JSON.stringify(allUserMsg));
        clearMessageList()
 console.log(allUserMsg);
      
        for (const UserMsgs of allUserMsg) {
            createListItem(UserMsgs);
        }

    } catch (err) {
        console.log(err);
    }
}

 function clearMessageList() {
   Msglist.innerHTML = ''; // Clear the content of the container
}