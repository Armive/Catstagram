export const BarItem = ({
	children,
	text,
	className = "",
}: {
	children: React.ReactNode;
	text: string;
	className?: string;
}) => {
	return (
		<div className={`flex justify-center items-center  gap-5 ${className}`}>
			{children}
			<p className="hidden xl:flex text-lg font-light w-[100px]">{text}</p>
		</div>
	);
};
