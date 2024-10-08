export default function Comment({ content, profiles }: Comments) {
	return (
		<>
			<p className="text-sm break-words gap-4">
				<span className="font-semibold m">{profiles?.name}</span>{" "}
				{content.slice(0, 170)}
				{content.length > 170 ? "See more" : ""}
			</p>
		</>
	);
}
