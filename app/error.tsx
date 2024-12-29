'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, RotateCw } from 'lucide-react'

export default function ErrorPage({
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const [isHoveredLink, setIsHoveredLink] = useState(false)
	const [isHoveredReload, setIsHoveredReload] = useState(false)

	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 gap-4">
			<h1 className="text-6xl font-bold mb-2">ERROR</h1>
			<p className="text-xl text-foreground">
				There is a bug, we will fix it soon.
			</p>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.5 }}
				style={{
					position: "relative",
					display: "flex",
					gap: "10px"
				}}
			>
				<Link
					href="/"
					className="inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-full text-foreground bg-background hover:bg-gray-200 transition-colors duration-300"
					onMouseEnter={() => setIsHoveredLink(true)}
					onMouseLeave={() => setIsHoveredLink(false)}
				>
					Back to homepage
					<motion.div
						style={
							{
								marginLeft: "8px"
							}
						}
						animate={{ x: isHoveredLink ? 5 : 0 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					>
						<ArrowRight className="h-5 w-5" />
					</motion.div>
				</Link>
				<div
					onClick={reset}
					onMouseEnter={() => setIsHoveredReload(true)}
					onMouseLeave={() => setIsHoveredReload(false)}
					className="inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-full text-background bg-foreground hover:bg-gray-200 transition-colors duration-300"
				>
					Reload
					<motion.div
						style={
							{
								marginLeft: "8px"
							}
						}
						animate={{ x: isHoveredReload ? 5 : 0 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					>
						<RotateCw className="h-5 w-5" />
					</motion.div>
				</div>
			</motion.div>
		</div>
	)
}