'use client'
import { ReactNode, createContext, useState} from "react";
export const SignUpContext = createContext({})

export const SignUpProvider = ({children}:{children:ReactNode})=>{
    const [userData, setUserData] = useState({})
    return(
        <SignUpContext.Provider value={{userData, setUserData}}>
            {children}
        </SignUpContext.Provider>
    )
}
