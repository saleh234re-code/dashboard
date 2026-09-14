import axios from "axios";
import { createContext } from "react";
import { useState,useEffect } from "react";
export const usersContext =createContext([])
 
export default function Users ({children}){
const [user,setUser] =useState([])

useEffect(()=>{
const getUser=async()=>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUser(response.data)
}
getUser()
},[])








    return(
        <usersContext.Provider value={{user,setUser}}> 
        <div>{children} </div>
        </usersContext.Provider>
    )
}