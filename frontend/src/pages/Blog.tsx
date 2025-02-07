import AppBar from "../components/AppBar";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks/useBlog";
import { useParams } from "react-router-dom";

const Blog = () => {
	const { id } = useParams();
	const { blog, loading } = useBlog({ id: id || "" });

	if (loading || !blog) {
		return (
			<div>
				<AppBar />
				<div className="w-screen h-screen flex flex-col justify-center items-center">
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div>
			{" "}
			<FullBlog blog={blog} />
		</div>
	);
};

export default Blog;
