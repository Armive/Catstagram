"use client";

import { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/ui/select";

export function Calendar() {
	const [day, setDay] = useState<string>("");
	const [month, setMonth] = useState<string>("");
	const [year, setYear] = useState<string>("");
	const [days, setDays] = useState<number[]>([]);

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 124 }, (_, i) => currentYear - i);
	const [months] = useState([
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]);

	useEffect(() => {
		if (month || year) {
			const yearNum = year ? Number.parseInt(year) : currentYear;
			const monthIndex = month ? months.indexOf(month) : 0;
			let daysInMonth: number;

			if (monthIndex === 1) {
				// February
				daysInMonth =
					(yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0
						? 29
						: 28;
			} else if ([3, 5, 8, 10].includes(monthIndex)) {
				// April, June, September, November
				daysInMonth = 30;
			} else {
				daysInMonth = 31;
			}

			setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));

			// Adjust selected day if it exceeds the number of days in the new month
			if (Number.parseInt(day) > daysInMonth) {
				setDay("");
			}
		}
	}, [month, year, currentYear, day, months]);

	return (
		<div className="w-full max-w-sm space-y-4">
			<h2 className="text-lg font-semibold text-foreground">Date of birth</h2>
			<div className="grid grid-cols-3 gap-2">
				<Select
					value={year}
					autoComplete="off"
					onValueChange={setYear}
					name="year"
				>
					<SelectTrigger className="text-foreground">
						<SelectValue placeholder="Year" className="text-foreground" />
					</SelectTrigger>
					<SelectContent>
						{years.map((y) => (
							<SelectItem key={y} value={y.toString()}>
								{y}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					value={month}
					autoComplete="off"
					onValueChange={setMonth}
					name="month"
				>
					<SelectTrigger className="text-foreground">
						<SelectValue placeholder="Month" />
					</SelectTrigger>
					<SelectContent>
						{months.map((m) => (
							<SelectItem key={m} value={m}>
								{m}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select autoComplete="" value={day} onValueChange={setDay} name="day">
					<SelectTrigger className="text-foreground">
						<SelectValue placeholder="Day" />
					</SelectTrigger>
					<SelectContent>
						{days.map((d) => (
							<SelectItem key={d} value={d.toString()}>
								{d}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{day && month && year && (
				<p className="text-sm text-gray-600">
					Date selected: {month} {day}, {year}
				</p>
			)}
		</div>
	);
}
