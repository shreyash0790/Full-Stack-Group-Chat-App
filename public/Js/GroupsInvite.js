
let addedUserIds = [];

document.getElementById('Invite-btn').addEventListener("click",async function(){
try {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:4000/Groups/Users/Invite`, {
      headers: {
          "Authorization": token
      }
  });
  const allUsers=response.data.allUsers
 

  document.getElementById("CreateInv-Form").style.display = "flex";
      const GroupNameActive=document.getElementById('InviteGroup')
      const queryParams = new URLSearchParams(window.location.search);
          const groupName = queryParams.get("groupName");
          // const groupId=queryParams.get("groupId");
      GroupNameActive.textContent=`Invite to Group: ${groupName}`

      
for(User of allUsers){

  const Userlists=document.getElementById('InviteList')
   const Userlistitems=document.createElement('li')
 Userlistitems.className='list-group-item'
 Userlistitems.style="display: flex; align-items: center; padding-top: 1px; padding-bottom: 1px; justify-content: space-between;"
 Userlistitems.textContent=User.Name

 const addBtn=document.createElement('button')
  addBtn.className='btnadd btnadd-outline-info'
  addBtn.textContent="Add"


  
      const captureUserId = () => {
        const userId = User.Id;
        addBtn.addEventListener('click', function (event) {
            event.preventDefault();
            addBtn.textContent = "Added";
            addedUserIds.push(userId);
          
        });
    };

    captureUserId();
  


  Userlistitems.appendChild(addBtn);
  Userlists.appendChild(Userlistitems);

}

} catch (err) {
  console.log(err);
}

})


async function closeInviteForm() {
  try{
  document.getElementById("CreateInv-Form").style.display = "none";
 const postUserData={
  UserId:addedUserIds
 }
  const queryParams = new URLSearchParams(window.location.search);
  const groupId = queryParams.get("groupId");
  const token = localStorage.getItem('token');
  const response = await axios.post(`http://localhost:4000/Groups/Confirm/Invite/${groupId}`,postUserData, {
      headers: {
          "Authorization": token
      }
  });


  }catch(err){
    console.log(err)
  }


   
}



