import * as React from "react";
 import { BrowserRouter } from 'react-router-dom';
import Box from "@mui/material/Box";
import Dashboard from "../pages/Dashboard";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
 

import Products from "../pages/Products";
import HomeIcon from '@mui/icons-material/Home';
 import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UsersDetails from "../pages/Users"
import TuneIcon from '@mui/icons-material/Tune';
import Orders from "../pages/Orders";
import Typography from "@mui/material/Typography";
import { Route,Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutNavigationLinks() {
  


  // Remove this const when copying and pasting into your project.

  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider>
      {/* preview-start */}
      <AppProvider
        branding={{
          title: "Store Dashboard",
        }}
        navigation={[
          {
            segment: "Dashboard",
            title: "Dashboard",
            icon: <HomeIcon />,
          },
          {
            segment: "Users",
            title: "Users",
            icon: <PeopleAltIcon />,
          },
          {
            segment: "Orders",
            title: "Orders",
            icon: <DescriptionIcon />,
          },
          {
            segment: "Products",
            title: "Products",
            icon: <ProductionQuantityLimitsIcon />,
          },
          {
            segment: "Setting",
            title: "Setting",
            icon: <TuneIcon />,
          },
        ]}
        
        theme={demoTheme}
      >
        <DashboardLayout>    <BrowserRouter>
 <Routes>

                    <Route path="/Dashboard" element={<Dashboard/>} />
                    <Route path="/Orders" element={<Orders/>} />
                    <Route path="/Users" element={<UsersDetails/>}/> 
                     <Route path="/Products" element={<Products/>} />
 


    </Routes>    </BrowserRouter>
</DashboardLayout>
      </AppProvider>
      {/* preview-end */}
    </DemoProvider>
  );
}
 