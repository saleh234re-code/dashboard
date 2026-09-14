import StatCard from "../Components/StatCard";
 import { PieChart } from '@mui/x-charts/PieChart'; 
import {OrderContext} from "../Context/OrdersContext";
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
   
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { productsContext } from "../Context/ProductsContext";
import "../Projectstyle.css";
  export default function Dashboard() {
   
   
const columns = [


  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Customer', headerName: 'Customer', width: 130 },
  { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'Total', headerName: 'Total', width: 130 },
    { field: 'status', headerName: 'status', width: 130 },
]
const{editOrder, setEditOrder}=useContext(OrderContext)
const rows =editOrder.map((u)=>({
    id:u.id,
   Total:u.total,
   Customer:u.customer.name,
Date:u.placedAt,
status:u.status,
}))
 console.log(editOrder)
  const {product} =useContext(productsContext)
   const ShowProduction=product.slice(0,5).map((t)=>{
console.log(product)
      return(
       <div key={t.id} style={{display:"flex",gap:"10px"}}>
        <p style={{ }}>{t.id}</p>
        <img src={t.image}  style={{width:"60px",padding:"10px"}}/>
        <p style={{width:"100%",color:"#1976d2",fontWeight:"400"}}>{t.title.slice(0,20)}</p>
        <p style={{textAlign:"right", color:"black",width:"100%"}}>{t.price}$</p>
       </div>
      )
    })
  return (
    <div >
      <h2 style={{textAlign:"start",paddingLeft:"10px"}}>Dashboard</h2>
<div style={{display:"flex",gap:"10px",paddingTop:"20px" ,alignItems:"center",justifyContent:"center"}}>
  
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
    >
             <StatCard title="Total Users" value="1,250" />

    </Box>
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
    >
        <StatCard title="Total Products" value={product.length} />

    </Box>
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
    >
      <StatCard title="Total Orders" value="850" />
    </Box>
</div>
<div style={{ display: "flex",
    justifyContent: "space-between",
    paddingTop:"5px",
    flexDirection:"row",
    width: "100%",
    gap: "20px"}}>
   <Box     sx={{
      width:750,
     
        p:2,
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
      }}> 
        <h3 style={{textAlign:"start",fontWeight:"700"
       }}>Sales OverView</h3>
       <LineChart
       
      xAxis={[{ data:editOrder.map((r)=>r.orderNumber), scaleType: "point"}]}
      series={[
        {
          data: editOrder.map((r)=> Number(r.total)),
          area: true,
        },
      ]}
      height={300}
    />
     
   
 </Box>
   <Box 
 

   sx={{
     
     width:500,
        p:3,
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
      }}> 
       <h3 style={{textAlign:"start",fontWeight:"700"
       }}>Order Status</h3>
    <PieChart
      series={[
        {
          data: [
            { id: 0, label: 'pending' ,value:editOrder.filter((u)=>u.status === "pending").length},
            { id: 1, value:editOrder.filter((u)=>u.status === "processing").length, label: 'processing' },
            { id: 2, value:editOrder.filter((u)=>u.status === "cancelled").length, label: 'cancelled' },
            { id: 2, value:editOrder.filter((u)=>u.status === "delivered").length, label: 'delivered' },
          ],
        },
      ]}
      width={200}
      height={200}
    />
   
 </Box>
 
</div>
 <div style={{display:"flex"}}>
<Box sx={{width:700,  p:3,
mt:"10px",
        borderRadius: 4,
        background: "linear-gradient(135deg, #ffffff, #f5f7fb)",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        transition: "0.3s",
        cursor:"pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
        },}}>
<h3 style={{textAlign:"start"}}><ShoppingCartIcon sx={{ml:1,color:"#1677F0"}}/> Recent Orders</h3>
       <div style={{ height: 400,paddingTop:'20px' }}>
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
 </Box>

  <Box 
 

   sx={{
     
     width:470,
        p:3,
        mt:"10px",
        ml:"20px",
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
      }}> 
       <h3 style={{textAlign:"start",fontWeight:"700"
       }}><EmojiEventsIcon sx={{color:"#1976d2", display:"inline-block"}}/> Top Products</h3>
    {ShowProduction}
   
 </Box>
 </div>
    </div>
  );
}
