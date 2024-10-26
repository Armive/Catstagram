"use client"

import { useState } from 'react'
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { EmailIcon } from '@/components/shared/icons'
import { Cat, ArrowLeft, Github } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shared/ui/select'
import { Calendar } from '@/components/shared/Calendar'
import { CardContent, CardHeader, } from '@/components/shared/ui/card'
import Link from 'next/link'
import { type SignUpType, User } from "@/lib/schemas";
import { onGithubLogin, SignUp } from '@/lib/actions'


export default function Signguis() {
    const [emailVerificationHelpLink, setEmailVerificationHelpLink] = useState<string | null>(null)
    const [userData, setUserData] = useState<SignUpType>({
        name: "",
        email: "",
        password: "",
        day: 0,
        month: 0,
        year: 0,
        gender: null,
        handle: "",
    });
    const [step, setStep] = useState(1)

    const handleNext = () => {
        if (step < 4) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement).entries(),
        ) as unknown as SignUpType;
        setUserData((data) => ({ ...data, ...formData }));
        if (step < 3) {
            handleNext();

        } else {


            const { data, success } = User.safeParse({
                email: userData.email,
                password: userData.password,
                name: userData.name,
                day: Number(userData.day),
                month: Number(userData.month),
                year: Number(userData.year),
                gender: userData.gender,
                handle: userData.handle,
            });
            if (!success) return
            SignUp(data)



            setStep(4)
            if (userData?.email?.includes("gmail")) {
                setEmailVerificationHelpLink("https://mail.google.com/mail/u/0/");
            } else if (
                userData?.email?.includes("outlook") ||
                userData?.email?.includes("hotmail")
            ) {
                setEmailVerificationHelpLink("https://outlook.live.com/mail/0/");
            }
            // Here you would typically send the data to your backend
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-black p-4">
            <Cat className="w-16 h-16 mb-8 text-foreground" />
            <h1 className="text-4xl text-foreground font-bold text-center mb-8 max-w-[300px]">
                Sign up to see furry animals.
            </h1>
            <div className="w-full max-w-[300px] space-y-4">
                {step < 4 && (
                    <Button
                        onClick={handleBack}
                        className=" dark:text-foreground"
                        variant="link"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                )}
                <div className="space-y-4">
                    {step === 1 && (
                        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="email" className="block text-foreground text-sm mb-2">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="Example: furry.pet@gmail.com"
                                    className="w-full  rounded  dark:text-white   "
                                    required
                                    name='email'
                                    minLength={5}
                                    maxLength={60}
                                    defaultValue={userData.email}
                                />

                            </div>
                            <div>
                                <label htmlFor="email" className="block text-foreground text-sm mb-2">Password</label>

                                <Input
                                    type="password"
                                    placeholder="Don't forget pas-sword"
                                    name='password'
                                    className="w-full border-border rounded dark:text-white"
                                    required
                                    minLength={6}
                                    maxLength={30}
                                    defaultValue={userData.password}
                                />

                            </div>
                            <Button
                                type="submit"
                                className='dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black '
                            >
                                Next Step
                            </Button>
                        </form>
                    )}
                    {step === 2 && (
                        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Your Name</label>

                                <Input
                                    type="text"
                                    placeholder="Write down your name"
                                    className="w-full border-gray-300 rounded"
                                    required
                                    name="name"
                                    minLength={2}
                                    defaultValue={userData.name}

                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Your Username</label>

                                <Input
                                    type="text"
                                    placeholder="Choose the furry little paw username"
                                    className="w-full border-gray-300 rounded"
                                    required
                                    id='username'
                                    name='handle'
                                    defaultValue={userData.handle}

                                />
                            </div>
                            <div>

                                <label htmlFor="gender" className="block text-sm mb-2 dark:text-white">Your Gender</label>
                                <Select name='gender' defaultValue={userData.gender || ''} >
                                    <SelectTrigger id="gender" className="w-full max-w-xs h-[38px] px-3 bg-background border dark:border-white rounded-[4px] shadow-sm text-muted-foreground text-[14px] focus:outline-none focus:ring-0 focus:border-[#D1D5DB]" >
                                        <SelectValue placeholder="Choose the furry little paw gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="none">Don&apos;t want to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                type="submit"
                                className='dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black '
                            >
                                Next Step
                            </Button>
                        </form>
                    )}
                    {step === 3 && (
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <Calendar />
                            <Button
                                type="submit"
                                className='dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black '
                            >
                                Next Step
                            </Button>
                        </form>
                    )}
                    {step === 4 && (
                        <div>
                            <CardHeader className="flex items-center">

                                <EmailIcon />
                            </CardHeader>
                            <CardContent className="flex justify-center flex-col items-center gap-4 ">
                                <p className="text-center ">
                                    We have sent an account verification email to  {userData.email}
                                </p>

                                {emailVerificationHelpLink ? (

                                    <Link href={emailVerificationHelpLink}> <Button
                                        type="submit"
                                        className='dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black '
                                    >
                                        Go to your email
                                    </Button></Link>
                                ) : null

                                }
                            </CardContent>


                        </div>

                    )}
                    {
                        step === 1 ? (
                            <>

                                <div className="relative">
                                    <hr className="border-gray-300 my-6" />
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-gray-500">
                                        or
                                    </span>
                                </div>
                                <Button
                                    className="w-full border-black text-black hover:bg-black hover:text-white rounded-full border dark:border-white bg-transparent hover:dark:bg-white dark:text-white gap-3 hover:dark:text-black"
                                    onClick={() => onGithubLogin()}
                                >
                                    <Github className='w-5 h-5' />
                                    Log in with Github
                                </Button>
                            </>

                        ) : null
                    }
                </div>

            </div>
            {
                step < 4 ? (
                    <Link href="/login" className="mt-8 text-foreground text-sm hover:underline">
                        Already have an account? Log in
                    </Link>

                ) : null
            }
        </div >
    )
}