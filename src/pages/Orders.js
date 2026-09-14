import { Box } from "@mui/material"
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "../Projectstyle.css";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
  import {Button} from "@mui/material";
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import {Select} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {OrderContext} from "../Context/OrdersContext";
import { useContext,useState } from "react";
import StatCard from "../Components/StatCard"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { DataGrid } from "@mui/x-data-grid/DataGrid";
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
  import { TextField } from "@mui/material";
export default function Orders(){
    const [opening, setOpening] = useState(false);
    
      const handleClickOpening = () => {
        setOpening(true);
      };
    
      const handleClosing = () => {
        setOpening(false);
      };
    
    const [selectedOrder, setSelectedOrder] = useState(null);
const [anchorEl, setAnchorEl] = useState(null);
  const opend = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };
     const [open, setOpen] = useState(false);
     const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
const {  editOrder,setEditOrder}=useContext(OrderContext)
  const [searchorder,setSearchorder]=useState("")

console.log(editOrder)
console.log(setEditOrder)
 const rows = editOrder.filter((u)=> 
 u.customer.name.toLowerCase().includes(searchorder.toLowerCase()) ).map((u)=>({
   id:u.id,
   Total:u.total,
   Customer:u.customer.name,
Date:u.placedAt,
Status:u.status,
 
   
  }
  

)
 

)
 const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Customer', headerName: 'Customer', width: 130 },
  { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'Total', headerName: 'Total', width: 130 },

      { field: 'Status', headerName: 'Status', width: 130 },
   { 
  field: "actions",
     
  flex: 1,

  headerName: "Actions",
  width: 200,
     headerAlign: "center",
 align:"center",

  renderCell:(params)=>(
<>
   <Button variant="contained"   sx={{ m:1}}   
  onClick={()=>{  ShowOrderDetails(params.row.id);
    handleClickOpen()
   
}}        
>
   <VisibilityIcon sx={{p:0.5}}/> view
</Button> 
<MoreVertIcon  style={{cursor:"pointer"}}     
    onClick={(event)=>{
          setSelectedOrder(params.row);
          handleClick(event)
    }}
/>
 


</>



)
},
];

function ShowOrderDetails(i){
const ShowOrder = editOrder.find((w)=>w.id == i )
   setSelectedOrder(ShowOrder);
 }
function handleDelete(i){
    const HandleDeleteOrder=editOrder.filter((o)=> 
        o.id !==i,
    )
    setEditOrder(HandleDeleteOrder)
    
    handleClosed()
}
function HandleNewStatus(i){
    const newStatus =editOrder.map((r)=>
        r.id === i
       ? {
          ...r,
          status: selectedOrder.status
        }
      :r
  );

  setEditOrder(newStatus);
   
  handleClosing();
}

    return(
        <div  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}>
            <h1   style={{textAlign:"left",paddingLeft:"10px"}}>Orders</h1>
          <div style={{display:"flex",gap:"5px",paddingRight:"10px" ,justifyContent:"space-between"}}>
              <Box
      sx={{
        width: 300,
        height:150,
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
    >
        <ShoppingCartIcon sx={{ml:1,color:"#1677F0"}}/>
             <StatCard title="Total Orders" value={editOrder.length} />

    </Box>
    <Box
          sx={{
            width: 300,
                    height:150,

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
        >
            <AccessTimeIcon sx={{ml:1,color:"#F59E0B" }}/>
                 <StatCard title="pending" value={editOrder.filter((r)=>r.status === "pending").length} />
    
        </Box>
        <Box
      sx={{
        width: 300,
                height:150,

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
    >
        <LocalShippingIcon sx={{ml:1,color:"#16B978"}}/>
             <StatCard title="Shipped" value={editOrder.filter((t)=>t.status === "processing").length} />

    </Box>
    <Box
          sx={{
            width: 300,
                    height:150,

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
        >
            < CheckCircleIcon sx={{ml:1,color:"#F25563" }}/>
                 <StatCard title="Delivered" value={editOrder.filter((s)=>s.status === "delivered").length} />
    
        </Box>
        
          
          </div>
           <div  >
<Box
          sx={{ p:2,
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
        >
           
              <TextField
                     value={searchorder}
                     onChange={(e)=>setSearchorder(e.target.value)}
           variant="outlined"
          placeholder= "البحث عن مستخدم"
         
          sx={{
            width: "600px",
            marginLeft:"10px"      
                
                
        
          }}
        />
           <div className="mydiv"id="restart" style={{paddingLeft:"20px",marginLeft:"20px"}}  onClick={() => {
                        setSearchorder("")
                      }}>
                    <sup style={{ }}>إلغاء الفلترة</sup>
                    <RestartAltIcon
                      sx={{
                        cursor: "pointer",
                        color: "rgb(0, 112, 120)",
                        marginRight: "3px",
                      }}
                     
                    />
                  </div>
        </Box>










           </div>
           <div>
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

           </div>
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
          fullWidth
        >
        <DialogTitle>
 <h4 style={{textAlign:"center",fontWeight:"800"}}>ORDER DETAILS</h4>
</DialogTitle>
          <DialogContent> 
         <p style={{fontSize:"1rem",color:"#1976d2",fontWeight:"600",textAlign:"center"}}>customer name  :  <span style={{color:"tomato"}}>  {selectedOrder?.customer?.name}</span></p>
         <p style={{fontSize:"1rem",color:"#1976d2",fontWeight:"600",textAlign:"center"}}>total:     <span style={{color:"tomato"}}>  {selectedOrder?.total}$</span></p>
         <p style={{fontSize:"1rem",color:"#1976d2",fontWeight:"600",textAlign:"center"}}>data:    <span style={{color:"tomato"}}>  {selectedOrder?.placedAt}</span></p>
         <p style={{fontSize:"1rem",color:"#1976d2",fontWeight:"600",textAlign:"center"}}>Location:   <span style={{color:"tomato"}}> {selectedOrder?.shippingAddress?.street}</span></p>
         <p style={{fontSize:"1rem",color:"#1976d2",fontWeight:"600",textAlign:"center"}}>paymentStatus:   <span style={{color:"tomato"}}>  {selectedOrder?.paymentStatus}</span></p>
         <p style={{fontSize:"1rem",color:"#1976d2",fontWeight:"600",textAlign:"center"}}>status:       <span style={{color:"tomato"}}>{selectedOrder?.status}</span></p>

           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}  >Cancel</Button>
             
  </DialogActions>
        </Dialog>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={opend}
        onClose={handleClosed}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{
            handleDelete(selectedOrder.id);   handleClosed(); 
        }
}>delete</MenuItem>
        <MenuItem onClick={()=>{
            handleClickOpening();
           handleClosed(); 
        }}>edit</MenuItem>
       </Menu>
         <Dialog
                  dir="ltr"

   fullWidth
         open={opening}
        onClose={handleClosing}
        
      >
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
        
       <Select
       fullWidth
       value={selectedOrder?.status}
       onChange={(e)=>  {   setSelectedOrder({...selectedOrder,status:e.target.value})}
        }>
  <MenuItem value="pending">Pending</MenuItem>
  <MenuItem value="processing">Processing</MenuItem>
  <MenuItem value="shipped">Shipped</MenuItem>
  <MenuItem value="delivered">Delivered</MenuItem>
  <MenuItem value="Cancelled">Cancelled</MenuItem>
</Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosing}>Cancel</Button>
          <Button   onClick={()=>{
            HandleNewStatus(selectedOrder.id)
          }}>Edit</Button>
        </DialogActions>
      </Dialog>
        </div>
     
       
    )
}