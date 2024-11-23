interface Profile {
	name: string;
	avatar_url: string | null;
	handle: string;
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
	is_pined: boolean;
}

interface Like {
	post_id: string;
	user_id: string;
}

interface SavedPost {
	post_id: string;
	user_id: string;
}

interface Follower {
	follower_id: string;
	followed_id: string;
}
