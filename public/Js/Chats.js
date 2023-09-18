


const SendBtn = document.getElementById('Send-btn');
const UserTextInput = document.getElementById('Text-input');
const Msglist = document.getElementById('User-msg-list');
const UserMsgDiv = document.getElementById('User-msg');


SendBtn.addEventListener('click', onSubmit);


// <.... chats   data >.....//

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
        const queryParams = new URLSearchParams(window.location.search);
        const groupId = queryParams.get("groupId");
        const response = await axios.post(`http://localhost:4000/UserMsg/groupChat/${groupId}`, UserTextData, {
            headers: {
                "Authorization": token
            }
        });

        const UserMsg = response.data;
        if (groupId) {
            createListItem(UserMsg);
        }
        else {
            alert('Select Group to send Messages')
        }
    } catch (err) {
        console.log(err);
    }
}


async function createListItem(UserMsg) {
    try {
        const newListItem = document.createElement('li');
        newListItem.className = 'clearfix'
        const newMessage = document.createElement('div');

        newMessage.textContent = `${UserMsg.UserName}:   ${UserMsg.MessageContent}`;


        newMessage.className = "message my-message"
        newMessage.id = 'User-msg';
        newMessage.style.display = 'inline-block'

        newListItem.appendChild(newMessage);
        Msglist.appendChild(newListItem);



    } catch (err) {
        console.log(err);
    }

}
document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    const groupName = queryParams.get("groupName");
    const groupNameDisplay = document.getElementById("group-name-display");
    groupNameDisplay.textContent = groupName;



    const queryParamsUsername = new URLSearchParams(window.location.search);
    const username = queryParamsUsername.get("username");

    // Set the username in the DisplayUser element
    const DisplayUser = document.getElementById('DisplayUsername');
    if (DisplayUser) {
        DisplayUser.textContent = username;
        DisplayUser.disabled = true;
    }


    //function calls
    GetUserTextData();
    getGroupsData();
    adminVerify();


})

// <...   getting chat data.....//
const MsgLimit = 50;
async function GetUserTextData() {
    try {
        const token = localStorage.getItem('token');
        let allUserMsg = [];


        const LocalMessages = localStorage.getItem('cachedMessages');
        if (LocalMessages) {
            allUserMsg = JSON.parse(LocalMessages);

        }
        const queryParams = new URLSearchParams(window.location.search);
        const groupId = queryParams.get("groupId");
        const response = await axios.get(`http://localhost:4000/GetUserMsg/groupChat/${groupId}`, {
            headers: {
                "Authorization": token
            }
        });

        if (groupId) {
            const { Messages } = response.data; // Destructure Messages and Username

            Messages.forEach((message) => {

                // Check if a message with the same Id already exists in allUserMsg
                const existingMessageIndex = allUserMsg.findIndex((existingMessage) => existingMessage.Id === message.Id);

                if (existingMessageIndex === -1) {
                    allUserMsg.push(message);
                } else {
                    // If a message with the same Id exists, update it with the new message
                    allUserMsg[existingMessageIndex] = message;
                }
            });


            if (allUserMsg.length > MsgLimit) {
                const messagesToRemoveIndex = allUserMsg.length - MsgLimit;
                allUserMsg.splice(0, messagesToRemoveIndex);
            }

            localStorage.setItem('cachedMessages', JSON.stringify(allUserMsg));
          

            clearMessageList();

            for (const UserMsgs of allUserMsg) {
                createListItem(UserMsgs);
            }


            //display Username who is ucurrently logfed inn 
            const DisplayUser = document.getElementById('DisplayUsername');

            DisplayUser.textContent = `${response.data.CurrentUsername}`
            DisplayUser.disabled = true


        }
        else {
            alert('No group Selected');
        }
    } catch (err) {
        console.log(err);
    }
}
//extras functions 
function clearMessageList() {
    Msglist.innerHTML = '';
}

function clearFields() {
    UserTextInput.value = '';
    GroupName = '';

}
// <..... group creationn and gettinng....>//


function closeGroupForm() {
    document.getElementById("CreateG-Form").style.display = "none";
    const GroupNameInput = document.getElementById('Group-name')
    const GroupName = GroupNameInput.value
    if (GroupName === '') {
        alert('Group name cannot be Empty')
    }
    else {
        const createGroup = { GroupName: GroupName };
        postGroupName(createGroup);
        clearFields();
    }
}

function openGroupForm() {
    document.getElementById("CreateG-Form").style.display = "flex";
}
async function postGroupName(createGroup) {

    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:4000/groupCreate', createGroup, {
            headers: {
                "Authorization": token
            }
        });

        const newGroupName = response.data.Group;
        DisplayGroupName(newGroupName);
    } catch (err) {
        console.log(err);
    }

}
function DisplayGroupName(newGroupName) {

    const GroupNameInput = document.getElementById('Group-name')
    const GroupName = GroupNameInput.value


    const listItem = document.createElement("li");
    listItem.className = "clearfix";


    const img = document.createElement("img");
    img.src = "https://plus.unsplash.com/premium_photo-1681487872232-fa622a6dd59e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80";
    img.alt = "avatar";


    const aboutDiv = document.createElement("div");
    aboutDiv.className = "about";


    const nameDiv = document.createElement("div");
    nameDiv.className = "name";


    const groupNameHeading = document.createElement("h6");
    groupNameHeading.className = "m-b-3";
    groupNameHeading.style.marginTop = "10px";
    groupNameHeading.textContent = GroupName;


    nameDiv.appendChild(groupNameHeading);
    aboutDiv.appendChild(nameDiv);
    listItem.appendChild(img);
    listItem.appendChild(aboutDiv);




    const groupList = document.getElementById("groupList");
    groupList.appendChild(listItem);

}


async function getGroupsData() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/getGroupData', {
            headers: {
                "Authorization": token
            }
        });
     
        const newGroup = response.data.GroupNames;


        for (group of newGroup) {
            const names = group.Group.GroupName
            const groupId = group.GroupId

            const listItem = document.createElement("li");
            listItem.className = "clearfix";


            const img = document.createElement("img");
            img.src = "https://plus.unsplash.com/premium_photo-1681487872232-fa622a6dd59e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80";
            img.alt = "avatar";


            const aboutDiv = document.createElement("div");
            aboutDiv.className = "about";


            const nameDiv = document.createElement("div");
            nameDiv.className = "name";


            const groupNameHeading = document.createElement("h6");
            groupNameHeading.className = "m-b-3";
            groupNameHeading.style.marginTop = "10px";
            groupNameHeading.textContent = names;


            nameDiv.appendChild(groupNameHeading);
            aboutDiv.appendChild(nameDiv);
            listItem.appendChild(img);
            listItem.appendChild(aboutDiv);

            listItem.addEventListener("click", function (e) {
                e.preventDefault();

                const url = `http://localhost:4000/Html/Chats.html?groupId=${groupId}&groupName=${names}`;

                window.location.href = url;




            });



            const groupList = document.getElementById("groupList");
            groupList.appendChild(listItem);
        }

    } catch (err) {
        console.log(err)
    }
}




async function adminVerify() {

    try {
        const Invitebtn = document.getElementById('Invite-btn')
        const GroupmemInfo = document.getElementById('GroupMem-btn')
        const removebtn=document.getElementById('Remove-btn')
        const adminbtn=document.getElementById('Admin-btn')
        const queryParams = new URLSearchParams(window.location.search);
        const groupId = queryParams.get("groupId");
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/GroupMember/Admin/verify/${groupId}`, {
            headers: {
                "Authorization": token
            }
        });
        const Admindata = response.data.Admin
        

        for(admin of Admindata){
            if (admin.Admin) {
                Invitebtn.style.display = "inline";
                removebtn.disabled=true

            }
            else {
                Invitebtn.style.display = "none";
                removebtn.style.display="none";
                adminbtn.style.display="none";
            }
        }
    } catch (err) {
        console.log(err)
    }

}

