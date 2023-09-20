

let removedUserIds = [];
let adminUserIds=[];



document.getElementById('GroupMem-btn').addEventListener("click",async function(){
try {
  const token = localStorage.getItem('token');
  const queryParams1 = new URLSearchParams(window.location.search);
  const groupId = queryParams1.get("groupId");
  const response = await axios.get(`http://localhost:4000/GroupMembers/${groupId}`, {
      headers: {
          "Authorization": token
      }
  });
  const Adminresponse = await axios.get(`http://localhost:4000/GroupMember/Admin/verify/${groupId}`, {
        headers: {
            "Authorization": token
        }
    });
    const Admindata = Adminresponse.data.Admin
  const GroupUsers=response.data.allMembers
 

  document.getElementById("GroupMembers-Form").style.display = 'flex';
      const GroupNameActive=document.getElementById('Group')
      const queryParams2 = new URLSearchParams(window.location.search);
          const groupName = queryParams2.get("groupName");
          // const groupId=queryParams.get("groupId");
      GroupNameActive.textContent=`Group: ${groupName}`

      
for(User of GroupUsers){
 
  const Userlists=document.getElementById('G-List')
   const Userlistitems=document.createElement('li')

 Userlistitems.className='list-group-item'
 Userlistitems.style="display:inline-block; align-items: center; padding-top: 1px; padding-bottom: 1px; justify-content: space-between; white-space: nowrap;  "
 Userlistitems.textContent=`Name :${User.User.Name}`

 const removeBtn=document.createElement('button')
  removeBtn.className='btnadd btnadd-outline-info'
 removeBtn.textContent="Remove"

 const adminBtn=document.createElement('button')
 adminBtn.className='btnadd btnadd-outline-info'
 adminBtn.textContent="Make Admin"


  
      const captureUserId = () => {
        const userId = User.UserId;
        removeBtn.addEventListener('click', function (event) {
            event.preventDefault();
            removeBtn.textContent = "Removed";
            removedUserIds.push(userId);
          
        });
    };
    const adminUserId = () => {
        const userId = User.UserId;
       adminBtn.addEventListener('click', function (event) {
            event.preventDefault();
            adminBtn.textContent = "Now Admin !";
           adminUserIds.push(userId);
           
        });
    };


    captureUserId();
    adminUserId();
    

    for(admin of Admindata){
        if (admin.Admin) {
          Userlistitems.appendChild(removeBtn);
          Userlistitems.appendChild(adminBtn);
        }
        
  
  Userlists.appendChild(Userlistitems);
  
}


}
} catch (err) {
  console.log(err);
}

})


async function closeGroupMemForm() {
    try{
    document.getElementById("GroupMembers-Form").style.display = "none";
   const removeUser={
    removeUserId:removedUserIds,
   }
 
  
    const queryParams = new URLSearchParams(window.location.search);
    const groupId = queryParams.get("groupId");
     await axios({
      method: 'delete',
      url: `http://localhost:4000/GroupMember/Delete/${groupId}`,
      data: removeUser, // Send the removeUser object in the request body
    });

 
    }catch(err){
      console.log(err)
    }
  
  
     
  }
  
  async function closeGroupMemAdminForm(){
    try{
      document.getElementById("GroupMembers-Form").style.display = "none";

      const makeAdmin={
        adminUserId:adminUserIds
       }
      
      const queryParams = new URLSearchParams(window.location.search);
      const groupId = queryParams.get("groupId");
      await axios({
        method: 'put',
        url: `http://localhost:4000/GroupMember/Admin/${groupId}`,
        data: makeAdmin, 
      });
  


    }catch(err){
      console.log(err)
    }
  }
 


