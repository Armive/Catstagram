import { Input } from "@/components/shared/ui/input";
import { Table, TableBody } from "@/components/shared/ui/table";
import { SearchItem } from "@/components/search/SearchItem";

export default function Search() {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<div className="bg-background rounded-lg shadow-sm overflow-hidden">
				<div className="px-4 py-5 sm:px-6">
					<div className="flex items-center">
						<div className="flex-1">
							<Input
								type="search"
								placeholder="Search people"
								className="w-full"
							/>
						</div>
					</div>
				</div>
				<div className="overflow-auto">
					<Table>
						<TableBody className="border-none">
							<SearchItem
								name="John Doe"
								isFollowed={true}
								followers={10500}
								latestReels={true}
							/>
							<SearchItem
								name="John Doe"
								isFollowed={true}
								followers={10500}
								latestReels={true}
							/>
							<SearchItem
								name="John Doe"
								isFollowed={true}
								followers={10500}
								latestReels={true}
							/>
							<SearchItem
								name="John Doe"
								isFollowed={false}
								followers={10500}
								latestReels={false}
							/>
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
