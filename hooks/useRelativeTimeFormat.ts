import { useEffect, useState } from "react";
import { enUS } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
export function useRelativeTimeFormat(date: string) {
	const [time, setTime] = useState("");
	useEffect(() => {
		const targetDate = new Date(date);
		const relativeTime = formatDistanceToNow(targetDate, {
			addSuffix: false,
			locale: enUS,
		});
		setTime(relativeTime);
	}, [date]);

	return time;
}
