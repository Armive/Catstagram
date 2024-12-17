'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import EmojiPicker, { type EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { Textarea } from "@/components/shared/ui/textarea"
import { Label } from "@/components/shared/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"
import { Button } from "@/components/shared/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/ui/popover"
import { SmileIcon } from 'lucide-react'
import { updateBiography } from '@/lib/actions'
import { useToast } from "@/components/shared/ui/use-toast";
import { MarkdownIcon } from '@/components/shared/icons'
import remarkGfm from "remark-gfm";


export default function MarkdownInputPreview({ description }: { description: string }) {
    const [text, setText] = useState(description || '')
    const [isLoading, setIsLoading] = useState(false)

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setText((prevText) => prevText + emojiData.emoji)
    }

    const { toast } = useToast()


    const onClick = async () => {
        if (isLoading) return
        setIsLoading(true)

        const data = await updateBiography(text)
        if (data.status === "ok") {
            toast({
                title: "Your profile description has been updated successfully"
            })
        }
        setIsLoading(false)



    }


    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Biography</CardTitle>
                <CardDescription>The Description About your Profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs defaultValue="edit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview" >Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit">
                        <div className="relative">
                            <Textarea
                                placeholder="Enter your text here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={10}
                                className="w-full pr-10 resize-none"
                                disabled={isLoading}
                                maxLength={300}
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute right-2 top-2"
                                        aria-label="Insert emojis"
                                    >
                                        <SmileIcon className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiClick}
                                        emojiStyle={EmojiStyle.APPLE}
                                        autoFocusSearch
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </TabsContent>
                    <TabsContent value="preview">
                        <div className="prose dark:prose-invert prose-h1:text-2xl prose-h2:text-[20px]  max-w-none border-border border rounded-md min-h-[258px] p-2 ">
                            <ReactMarkdown disallowedElements={['img']} remarkPlugins={[remarkGfm]}>{text.replaceAll('\n', '  \n')}</ReactMarkdown>
                        </div>
                    </TabsContent>
                </Tabs>

            </CardContent>
            <CardFooter className='gap-6'>
                <Button onClick={onClick} disabled={isLoading}>{isLoading ? "Loading..." : "Save Changes"}</Button>

                <Label htmlFor="markdown-mode" className='flex items-center gap-2'><MarkdownIcon /> supported.</Label>
            </CardFooter>
        </Card>
    )
}

