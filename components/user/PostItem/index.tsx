import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { PinFilledIcon, PinRegularIcon } from "@/components/shared/icons";
import { useState } from "react";

export const PostItem = ({ post, userId, onClick }: { post: PostType, userId: string, onClick: (id: string) => void }) => {
    const [isPined, setIsPined] = useState(post.is_pined);
    const onPin = async (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        const res = await fetch("/api/posts/pined", {
            method: "POST",
            body: JSON.stringify({
                post_id: post.id,
            }),
        });
        if (res.status === 200) {
            setIsPined(true);
        }
    }
    const onUnpin = async (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        const res = await fetch("/api/posts/pined", {
            method: "DELETE",
            body: JSON.stringify({
                post_id: post.id,
            }),
        });
        if (res.status === 200) {
            setIsPined(false);
        }
    }
    return (
        <div
            className="aspect-square bg-black overflow-hidden relative group"
            onClick={() => onClick(post.id)}
        >
            <Image
                src={post.imageUrl || ""}
                alt="Try to reload"
                className="w-full h-full object-cover"
                width={400}
                height={400}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                {
                    userId === post.user_id ? (

                        <span className="absolute top-3 right-3 cursor-pointer" >
                            {
                                isPined ? (
                                    <span onClick={(e) => onUnpin(e)} >
                                        <PinFilledIcon />
                                    </span>
                                ) : (
                                    <span onClick={(e) => onPin(e)} >
                                        <PinRegularIcon />
                                    </span>
                                )

                            }

                        </span>
                    ) : (
                        null
                    )
                }
                <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views}
                </span>
                <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.post_likes.length}
                </span>
            </div>
        </div>
    );
}