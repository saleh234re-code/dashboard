import logo from './logo.svg';
import './App.css';
import  ProductsContext  from './Context/ProductsContext';
  import SideBar from "./Components/sideBar"
  import Users from './Context/Users';
  import { BrowserRouter, Route,Routes } from 'react-router-dom';
  import Dashboard from './pages/Dashboard';
  import OrderContext from './Context/OrdersContext';
function App() {
  
  return (
  <OrderContext>    
  <Users> 
          <ProductsContext > 

     <div className="App">
      <SideBar/>

      </div>
                        </ProductsContext>
                        </Users>
                     <BrowserRouter> 
                   
<Routes>
 
     
</Routes>
   </BrowserRouter>
 </OrderContext>

   );
}

export default App;
