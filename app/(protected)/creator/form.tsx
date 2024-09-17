"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, MapPin, FileText, Send, X } from "lucide-react";

export function GradientTweetComposer({
	avatar_url,
	name,
}: { avatar_url: string; name: string }) {
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [place, setPlace] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isFormComplete, setIsFormComplete] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send this data to your backend
		setContent("");
		setDescription("");
		setPlace("");
		setImage(null);
		setIsExpanded(false);
		setIsFormComplete(false);
	};

	useEffect(() => {
		if (!image) {
			setIsExpanded(false);
		}
	}, [image]);

	useEffect(() => {
		setIsFormComplete(
			content !== "" && description.length >= 20 && image !== null,
		);
	}, [content, description, image]);

	return (
		<Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
			<CardContent className="p-6">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex items-start space-x-4">
						<Avatar className="w-12 h-12">
							<AvatarImage src={avatar_url} alt={name[0]} />
							<AvatarFallback>{name[0]}</AvatarFallback>
						</Avatar>
						<div className="flex-grow">
							<div className="relative">
								<Input
									type="file"
									accept="image/*"
									className="hidden"
									id="image-upload"
									onChange={(e) => {
										handleImageChange(e);
										setContent(e.target.value);
										if (!isExpanded && (e?.target?.files?.length || 0) > 0) {
											setIsExpanded(true);
										}
									}}
								/>
								<label
									htmlFor="image-upload"
									className="flex items-center justify-center w-full p-2 bg-gradient-to-r from-pink-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
								>
									<ImagePlus className="w-5 h-5 mr-2 text-pink-500" />
									<span className="text-sm text-gray-600 dark:text-gray-300">
										{image ? image.name : "Add an image"}
									</span>
								</label>
								{image && (
									<Button
										size="icon"
										variant="ghost"
										className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
										onClick={() => setImage(null)}
									>
										<X className="w-4 h-4" />
									</Button>
								)}
							</div>
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{
									height: isExpanded ? "auto" : 0,
									opacity: isExpanded ? 1 : 0,
								}}
								transition={{ duration: 0.3 }}
								className="space-y-4 overflow-hidden"
							>
								<div className="relative mt-4">
									<FileText className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
									<Textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Add the post title"
										className="pl-10 pt-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 border-none placeholder-gray-400 resize-none min-h-[100px] focus-visible:ring-transparent"
										maxLength={100}
										minLength={10}
									/>
								</div>
								<div className="relative">
									<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-500" />
									<Input
										placeholder="Add location (optional)"
										value={place}
										onChange={(e) => setPlace(e.target.value)}
										className="pl-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 border-none placeholder-gray-400 focus-visible:ring-transparent"
										minLength={1}
										maxLength={40}
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="px-6 py-4 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-gray-800 dark:to-gray-700 flex justify-between items-center rounded-b-lg">
				<div className="text-sm text-gray-600 dark:text-gray-300">
					{image ? (
						!description ? (
							<p>Write the post title</p>
						) : (
							<p>{100 - description.length} characters remaining</p>
						)
					) : (
						<p>First upload or drag an image</p>
					)}
				</div>
				<AnimatePresence>
					{isFormComplete && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.3 }}
						>
							<Button
								type="submit"
								className="rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
								onClick={handleSubmit}
							>
								<Send className="w-4 h-4 mr-2" />
								Post
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</CardFooter>
		</Card>
	);
}
