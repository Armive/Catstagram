"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/shared/ui/button";
import { ScrollArea } from "@/components/shared/ui/scroll-area";
import { DogIcon } from "lucide-react";
import clsx from "clsx";

type Reaction = {
	emoji: string;
};

const reactions: Reaction[] = [
	{ emoji: "🐶" },
	{ emoji: "🐱" },
	{ emoji: "🐭" },
	{ emoji: "🐹" },
	{ emoji: "🐰" },
	{ emoji: "🦊" },
	{ emoji: "🐻" },
	{ emoji: "🐼" },
	{ emoji: "🐨" },
	{ emoji: "🐯" },
	{ emoji: "🦁" },
	{ emoji: "🐮" },
	{ emoji: "🐷" },
	{ emoji: "🐸" },
	{ emoji: "🐵" },
	{ emoji: "🐔" },
	{ emoji: "🐧" },
	{ emoji: "🦆" },
	{ emoji: "🦅" },
	{ emoji: "🦉" },
	{ emoji: "🐴" },
	{ emoji: "🦄" },
	{ emoji: "🐝" },
	{ emoji: "🐛" },
	{ emoji: "🦋" },
	{ emoji: "🐞" },
	{ emoji: "🐍" },
	{ emoji: "🐢" },
	{ emoji: "🐙" },
	{ emoji: "🐠" },
	{ emoji: "🐟" },
	{ emoji: "🐳" },
	{ emoji: "🐬" },
	{ emoji: "🦜" },
	{ emoji: "🐾" },
	{ emoji: "🌿" },
	{ emoji: "❤️" },
	{ emoji: "😍" },
	{ emoji: "😂" },
	{ emoji: "🥰" },
	{ emoji: "😻" },
	{ emoji: "🐕" },
	{ emoji: "🐩" },
	{ emoji: "🦮" },
	{ emoji: "🐕‍🦺" },
	{ emoji: "🐈" },
	{ emoji: "🐆" },
	{ emoji: "🐎" },
	{ emoji: "🐇" },
	{ emoji: "🐦" },
	{ emoji: "🦢" },
	{ emoji: "🦩" },
];

export default function EmojiPostIcon() {
	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleReaction = (emoji: string) => {
		const closePopover = () => {
			setIsClosing(true);
			timeoutRef.current = setTimeout(() => {
				setIsOpen(false);
				setIsClosing(false);
			}, 300); // 0.3 second transition
		};
		setSelectedEmoji(emoji);
		closePopover();

		if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
		resetTimeoutRef.current = setTimeout(() => {
			setSelectedEmoji(null);
		}, 5000); // Reset to default icon after 5 seconds
	};

	const togglePopover = () => {
		if (isOpen) {
			const closePopover = () => {
				setIsClosing(true);
				timeoutRef.current = setTimeout(() => {
					setIsOpen(false);
					setIsClosing(false);
				}, 300); // 0.3 second transition
			};
			closePopover();
		} else {
			setIsOpen(true);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				const closePopover = () => {
					setIsClosing(true);
					timeoutRef.current = setTimeout(() => {
						setIsOpen(false);
						setIsClosing(false);
					}, 300); // 0.3 second transition
				};
				closePopover();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
		};
	}, []);

	return (
		<div>
			<Button
				ref={buttonRef}
				onClick={togglePopover}
				aria-label={
					selectedEmoji ? `Selected reaction: ${selectedEmoji}` : "React"
				}
				size="icon"
				className={clsx(
					"rounded-full hover:bg-black bg-white/20 backdrop-blur-sm text-2xl",
					{
						"bg-black": isOpen,
					},
				)}
			>
				{selectedEmoji || <DogIcon className="text-white" />}
			</Button>
			<div
				style={{
					transformOrigin: "top center",
					width: "240px",
				}}
				className={clsx(
					"absolute  -top-3/4  left-1/2 -translate-x-1/2 mt-2 p-2 bg-white rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out",
					{
						"opacity-100 scale-100": isOpen && !isClosing,
						"opacity-0 scale-0": !isOpen || isClosing,
					},
				)}
			>
				<ScrollArea className="h-72 w-full rounded-md">
					<div className="grid grid-cols-4 gap-2 p-2 ">
						{reactions.map((reaction) => (
							<Button
								key={reaction.emoji}
								onClick={() => handleReaction(reaction.emoji)}
								aria-label={`React with ${reaction.emoji}`}
								className="h-10 w-10 p-0 text-lg"
								variant="ghost"
							>
								{reaction.emoji}
							</Button>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
