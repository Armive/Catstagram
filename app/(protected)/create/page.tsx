"use client";

import { FormEvent, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CameraIcon, CheckIcon } from "@/components/icons";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";


export default function Create() {
  const [file, setFile] = useState<Blob|string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [view, setView] = useState(0);
  const submitFirstPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const inputFileElement = form.querySelector('.input-file') as HTMLInputElement

    const file = inputFileElement?.files?.[0] as Blob
    setFile(file)



  }
  const submitSecondPage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formDataForm = new FormData(form)

    const place = formDataForm.get('place') || ''
    const title = formDataForm.get('title') || ''
    const description = formDataForm.get('description') || ''
    const formdata = new FormData()

    const requestOptions = { method: 'POST', body: formdata };
    formdata.append('file', file)
    formdata.append('place', place)
    formdata.append('title', title)
    formdata.append('description', description)
    setLoading(true)
    const response = await fetch(`${document.location.origin}/api/create`, requestOptions)
    const data = await response.json()
    if (response.status === 200) {
      setView((view) => view + 1);
      setLoading(false)
    }


  }

  return (
    <main className="flex justify-center ">
      <Card className={`w-[370px] min-h-[370px] p-3 ${loading ?'animate-pulse':''}`}>
        <Progress value={25 * (view + 1)} />
        {view === 0 && (
          <form onSubmit={() => setView(view + 1)}>
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Create Your Post In A Few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center">
              <CameraIcon />
              <Button>Start</Button>
            </CardContent>
            <CardFooter>
              <ul className="list-disc flex flex-col gap-4 px-4">
                <li>
                  Do not upload <b>violence</b> or <b>abuse</b> of animals
                </li>
                <li>
                  Only upload things that have to do with <b>animals</b>
                </li>
                <li>
                  <b>Don&apos;t plagiarize:</b> Never copy other people&apos;s
                  work or ideas without giving them proper credit. Always cite
                  sources when using information or content from others and
                  respect copyright.
                </li>
              </ul>
            </CardFooter>
          </form>
        )}
        {view === 1 && (
          <form onSubmit={(e) => {
            setView(view + 1)
            submitFirstPage(e)
          }}>
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Create Your Post In A Few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center">
              <CameraIcon />
              <Button type="submit" disabled={loading} >Continue</Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-8 mt-8">

              <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                <Label htmlFor="picture" className="text-center">
                  Drag The Photos, Videos Or Choose The File
                </Label>
                <Input
                  disabled={loading}
                  required
                  id="picture"
                  type="file"
                  className="cursor-pointer input-file"
                  accept=".mp4, .mov, .wnv, .avi, .avchd, .flv, .f4v, .swf, .mkv, .webm, .jpg, .png, .tiff, .psd, .bmp, .webp"
                />
              </div>
            </CardFooter>
          </form>
        )}{
          view === 2 && (
            <form onSubmit={(e) => {
              submitSecondPage(e)
            }}>
              <CardHeader className="flex justify-center items-center flex-col">
                <CardTitle>Create Post</CardTitle>
                <CardDescription>
                  Create Your Post In A Few minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3 items-center justify-center">
                <CameraIcon />
                <Button type="submit" disabled={loading}>Finish</Button>
              </CardContent>
              <CardFooter className="flex flex-col gap-8 mt-8">
                <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                  <Label htmlFor="title"  >
                    Title
                  </Label>
                  <Input required disabled={loading} maxLength={30} id='title' type="text" placeholder="My cat in the forest" name='title' />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                  <Label htmlFor="description" >
                    Description
                  </Label>
                  <Textarea disabled={loading} maxLength={60} required id='description' placeholder="My cat in the forest eating a mouse " name='description' />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                  <Label htmlFor="place"  >
                    Place
                  </Label>
                  <Input id='place' required type="text" placeholder="Catsland" name='place' disabled={loading} maxLength={25}/>
                </div>

              </CardFooter>
            </form>
          )
        }
        {view === 3 && (
          <form >
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Create Your Post In A Few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center flex-col">
              <CheckIcon />
              <p>You Have Finished Making Your Post</p>
            </CardContent>
            <CardFooter className="flex justify-center m-4">
              <Link
                href="/"
                className="bg-white border font-medium border-white text-black rounded-lg duration-200 p-2 hover:bg-gray-200 "
              >
                Return to Homepage
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </main>
  );
}
