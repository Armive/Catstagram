'use client'
import { ReactNode, createContext, useState} from "react";
const useData = ()=>{
    const [userData, setUserData] = useState({})
    const defaultData:{setUserData:(arg0:any)=>void, userData:SignUpData} = {userData, setUserData}
    return defaultData
} 
export const SignUpContext = createContext(useData())

export const SignUpProvider = ({children}:{children:ReactNode})=>{
    return(
        <SignUpContext.Provider value={useData()}>
            {children}
        </SignUpContext.Provider>
    )
} 
