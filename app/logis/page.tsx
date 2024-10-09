"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { GithubIcon } from '@/components/icons'
import { Cat } from 'lucide-react'

export default function Logis() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Registration attempted with:', email)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <Cat className="w-10 h-10 mb-8" />
            <h1 className="text-5xl font-bold text-center mb-8 max-w-[500px]">
                Log in for endless furry content
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-[324px] space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Example: furry.pet@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border-gray-700 rounded text-foreground placeholder-gray-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm mb-2">Password</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder='Enter your secret paw-sword'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border-gray-700 rounded text-foreground placeholder-gray-500"
                    />
                </div>
                <a href="22" className="block text-foreground  text-sm hover:underline">
                    Haven't created your account yet? Sign up
                </a>
                <Button
                    type="submit"
                    className="w-full bg-[#FF4081]  text-white font-semibold py-3 rounded-full transition duration-300"
                >
                    Log in
                </Button>
            </form>
            <div className="w-full max-w-[324px] mt-4">
                <div className="relative">
                    <hr className="border-gray-700 my-8" />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-secondary-foreground">
                        o
                    </span>
                </div>
                <Button
                    className="w-full bg-transparent hover:bg-secondary text-foreground font-bold py-3 px-4 rounded-full border border-gray-700 mb-4 gap-2"
                    onClick={() => console.log('Google login')}
                >
                    <GithubIcon />
                    Log in with Github
                </Button>

            </div>
        </div>
    )
}