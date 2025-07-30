import HoverImageBlogPost from "../HoverImageBlogPost";
import { BlogPost } from "../../types";

interface BlogPostsSectionProps {
  blogPosts: BlogPost[];
}

export default function BlogPostsSection({ blogPosts }: BlogPostsSectionProps) {
  return (
    <section className="py-16 px-4 col-span-4 sm:col-start-1 sm:col-end-9">
      <div>
        <h2>Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-4">
            {blogPosts.map((post) => (
              <HoverImageBlogPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
