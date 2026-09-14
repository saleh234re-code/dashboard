
import { useContext } from "react"
import { usersContext } from "../Context/Users"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

  import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
  import { TextField } from "@mui/material";
  import { useState } from "react";
  import {Button} from "@mui/material";
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
import { DataGrid } from '@mui/x-data-grid';
import "../Projectstyle.css";
import { Box, colors } from "@mui/material"
import StatCard from "../Components/StatCard"
export default function UsersShow (){
    const [DataForm,setDataForm]=useState({
        userName:"",
        email:""
    })
 

    const [open, setOpen] = useState(false);
 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   /* function HandleEditUser(p){
 const selectedUser = user.find((u) => u.id === p.id);
     

    setUser(selectedUser)

    
    }*/
     const [search,setSearch]=useState("")   
     const [editUser,setEditUser]=useState(null)   
    
    const {user,setUser}=useContext(usersContext)
  
function handleSaveUser( ){
    if(editUser){
        const updatedProducts =user.map((y)=> 
            y.id== editUser.id
            ?{
                ...y,
                username:DataForm.userName,
                email:DataForm.email
            }
           : y

        
    )
    setUser(updatedProducts)
    }else{

        const newUser = {
            id:user.length + 1,
            username:DataForm.userName,
            email:DataForm.email
        }
        setUser([...user,newUser])
    }
    setDataForm({ userName:"", email:"" })
    setEditUser(null)
    handleClose()
}


    function HandleDeleteRow(i){
        console.log("السلام عليكم")
const HandleDelete = user.filter((p)=> 
p.id !== i
)
setUser(HandleDelete)

    }
 const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'name', width: 130 },
  { field: 'Email', headerName: 'Email', width: 130 },
  
   { 
  field: "actions",
     
  flex: 1,

  headerName: "Actions",
  width: 200,
     headerAlign: "center",
 align:"center",

  renderCell: (params) => (
    <>
      <Button
              sx={{ ml: 1 }}

      
        variant="contained"
        size="small"
        onClick={
            ()=>{
 
 setEditUser(params.row);

  setDataForm({
    userName: params.row.Name,
    email: params.row.Email,
  });

   

             handleClickOpen();

            }
        }
      >
        Edit
      </Button>

      <Button
               

        variant="contained"
        color="error"
        size="small"
        sx={{ ml: 1 }}
         onClick={() => {
             HandleDeleteRow(params.row.id)}}
      >
        Delete
      </Button>
    </>
  ),
},
  
 
];
 const rows =user.filter((p)=>
p.username.toLowerCase().includes(search.toLowerCase()) 
).map((p)=>({
 
id:p.id,
Name:p.username,
 Email :p.email,
 
}))
console.log(user)
 
  return(
  <div>
 
<div id="pageDetails">

<h2>Users</h2>
<div id="records"> 
     
    
  
        <Box
      sx={{
        width: 400,
     
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(135deg, #ffffff, #f5f7fb)",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        transition: "0.3s",
        cursor:"pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
        },
      }}
    >                <PeopleAltIcon   sx={{ ml: 2,color:"blue" }} />

             <StatCard title="Total Users" value={user.length} />

    </Box>
 

</div>
 
 
</div>
<div style={{display:"flex", justifyContent:"space-around",padding:"20px 0"}}>
     <TextField
            value={search}
            onChange={(e)=>{
              setSearch  (e.target.value)
            }}
   variant="outlined"
  placeholder= "البحث عن مستخدم"
 
  sx={{
    width: "600px",
    marginLeft:"10px"      
        
        

  }}
/>
 
         <Button variant="contained"   sx={{ float: "right",mr:2}}  onClick={
            ()=>{
 setEditUser(null);

 
             handleClickOpen();
 setDataForm({
        userName:"",
        email:""
    })
            }
        }
>
  + Add New User
</Button> 
    </div>   
<div style={{ height: 400, width: '100%',paddingTop:'10px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
       /** checkboxSelection*/ 
      />
    </div>
      <div>
        <Dialog
          dir="rtl"
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();

               

               handleClose();
            },
          }}
        >
        <DialogTitle>
  {editUser ? "تعديل بيانات المستخدم" : "إضافة مستخدم جديد"}
</DialogTitle>
          <DialogContent>
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                },
              }}
              autoFocus
              required
                value={DataForm.userName}
              onChange={(e)=>{
                setDataForm({...DataForm,userName:e.target.value})
              }}
              margin="dense"
              id="title"
              name="title"
              label="اسم المستخدم"
              type="text"
              fullWidth
              variant="standard"
            />
             <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                
                }
              }}
              autoFocus
              required
              value={DataForm.email}
              onChange={(e)=>{
                setDataForm({...DataForm,email:e.target.value})
              }}
              margin="dense"
              id="Email"
              name="الايميل"
              label="الايميل"
              type="text"
              fullWidth
              variant="standard"
            />
         
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}  >إلغاء</Button>
            <Button type="submit" onClick={ () => handleSaveUser()}>  {editUser ? "تعديل" : "إضافة"}
</Button>
          </DialogActions>
        </Dialog>
      </div>
  
</div>
 



        
    )
}