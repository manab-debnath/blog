import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks/useBlogs";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
	const { loading, blogs } = useBlogs();

	if (loading) {
		return (
			<div>
				<AppBar />
				<div className="flex justify-center w-full">
					<div className="w-full max-w-screen-md">
						{Array.from({ length: 7 }).map((_, index) => (
							<Skeleton key={index} />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<AppBar />
			<div className="flex justify-center">
				<div className="max-w-2xl">
					{blogs.map((blog) => (
						<BlogCard
							id={blog.id}
							authorName={blog.author.name || "Anonymous"}
							title={blog.title}
							content={blog.content}
							publishedDate="24/01/2025"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Blogs;
