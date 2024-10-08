interface Profile {
	name: string;
	avatar_url: string | null;
}
interface Comments {
	comment_id: string;
	post_id: string;
	created_at: string;
	author_id: string;
	content: string;
	subcomments?: string[];
	profiles?: Profile;
}

interface PostType {
	id: string;
	url: string;
	place: string | null;
	views: number;
	user_id: string;
	comments: Comments[];
	profiles: Profile;
	created_at: string;
	post_likes: Like[];
	description: string;
	saved_posts: SavedPost[];
	imageUrl?: string;
}

interface Like {
	post_id: string;
	user_id: string;
}

interface SavedPost {
	post_id: string;
	user_id: string;
}
