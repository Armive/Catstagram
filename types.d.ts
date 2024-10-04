interface SignUpData {
	email?: string;
	name?: string;
	password?: string;
	day?: number;
	month?: number;
	year?: number;
	gender?: "male" | "female" | "none";
	handle?: string;
}

interface Comments {
	comment_id: string;
	post_id: string;
	created_at: string;
	author_id: string;
	content: string;
	subcomments?: string[];
	profiles?: { name: string; avatar_url: string };
}
