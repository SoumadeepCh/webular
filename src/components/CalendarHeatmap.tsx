import { useEffect, useState } from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import clsx from "clsx";

interface Props {
	activity: Record<string, number>;
	days?: number; // e.g., 90 for last 3 months
}

const getColorClass = (count: number) => {
	if (count >= 5) return "bg-green-600";
	if (count >= 3) return "bg-green-500";
	if (count >= 1) return "bg-green-300";
	return "bg-gray-200";
};

export default function CalendarHeatmap({ activity, days = 90 }: Props) {
	const end = new Date();
	const start = subDays(end, days);
	const dates = eachDayOfInterval({ start, end });

	return (
		<div className="grid grid-cols-13 gap-1 overflow-x-auto">
			{dates.map((date, index) => {
				const key = format(date, "yyyy-MM-dd");
				const count = activity[key] || 0;

				return (
					<div
						key={index}
						className={clsx(
							"w-4 h-4 rounded-sm",
							getColorClass(count)
						)}
						title={`${key}: ${count} question${
							count !== 1 ? "s" : ""
						}`}></div>
				);
			})}
		</div>
	);
}
