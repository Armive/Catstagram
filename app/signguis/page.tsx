"use client"

import { useState } from 'react'
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { GithubIcon } from '@/components/shared/icons'
import { Cat, ArrowLeft, ArrowBigLeft, ArrowRight, Mail } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shared/ui/select'
import { Calendar } from '@/components/shared/Calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shared/ui/card'
import Link from 'next/link'

type SignUpType = {
    name: string;
    email: string;
    password: string;
    day: number;
    month: number;
    year: number;
    gender: string;
    handle: string;
}

export default function SignUp() {
    const [emailVerificationHelpLink, setEmailVerificationHelpLink] = useState<string | null>(null)
    const [userData, setUserData] = useState<SignUpType>({
        name: "",
        email: "",
        password: "",
        day: 0,
        month: 0,
        year: 0,
        gender: "none",
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
                {step > 1 && (
                    <Button
                        onClick={handleBack}
                        className="mb-4 dark:text-foreground"
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
                                    className="w-full border-border rounded"
                                    required
                                    minLength={6}
                                    maxLength={30}
                                    defaultValue={userData.password}
                                />

                            </div>
                            <Button
                                type="submit"
                            >
                                Next Step
                            </Button>
                        </form>
                    )}
                    {step === 2 && (
                        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm mb-2">Your Name</label>

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
                            <Input
                                type="text"
                                placeholder="Choose the furry little paw username"
                                className="w-full border-gray-300 rounded"
                                required
                                name='handle'
                                defaultValue={userData.handle}

                            />
                            <Select name='gender' defaultValue={userData.gender}>
                                <SelectTrigger className="w-full max-w-xs h-[38px] px-3 bg-background border border-muted-foreground rounded-[4px] shadow-sm text-muted-foreground text-[14px] focus:outline-none focus:ring-0 focus:border-[#D1D5DB]">
                                    <SelectValue placeholder="Choose the furry little paw gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="none">Don&apos;t want to say</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                type="submit"
                            >
                                Next
                            </Button>
                        </form>
                    )}
                    {step === 3 && (
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <Calendar />
                            <Button
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </form>
                    )}
                    {step === 4 && (
                        <div>
                            <h1 className='text-bold'>Check your inbox</h1>
                            <h2>We&apos;ve sent you an email with a link to activate your account. Please check your inbox and click the link.</h2>
                            {emailVerificationHelpLink ? (

                                <Link href={emailVerificationHelpLink}><Button variant="link">Go to mail</Button></Link>
                            ) : null

                            }


                        </div>

                    )}
                    <div className="relative">
                        <hr className="border-gray-300 my-6" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-gray-500">
                            or
                        </span>
                    </div>
                </div>
                <Button
                    className="w-full bg-transparent hover:bg-secondary text-foreground font-bold py-3 px-4 rounded-full border border-gray-700 mb-4 gap-2"
                    onClick={() => console.log('Google login')}
                >
                    <GithubIcon />
                    Log in with Github
                </Button>
            </div>
            <Link href="/login" className="mt-8 text-foreground text-sm hover:underline">
                Already have an account? Log in
            </Link>
        </div >
    )
}