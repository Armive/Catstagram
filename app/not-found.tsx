
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {


  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 gap-4">



      <h1 className="text-9xl font-bold mb-2">404</h1>



      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3  text-base font-medium rounded-full   bg-background text-foreground
        hover:text-background hover:bg-foreground  transition-colors duration-300"

      >
        Back to homepage

      </Link>

    </div>
  )
}

