'use client'
import {  createContext, useState} from "react";
 
export const SignUpContext = createContext()
export const SignUpProvider = ({children})=>{
    const [userData, setUserData] = useState({}) 
    return(
        <SignUpContext.Provider value={{userData, setUserData}}>
            {children}
        </SignUpContext.Provider>
    )
} 
