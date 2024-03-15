import { SignUpProvider } from "@/components/signUpContext";

export  default function SignUpLayout({children}:{children:React.ReactNode}){
    return (<SignUpProvider>{children}</SignUpProvider>)
}