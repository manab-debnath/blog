import { Blog } from "../hooks/useBlog";
import AppBar from "./AppBar";
import Avatar from "./Avatar";

const FullBlog = ({ blog }: { blog: Blog }) => {
	return (
		<div>
			<AppBar />
			<div className="flex justify-center">
				<div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
					<div className="col-span-8">
						<div className="text-5xl font-extrabold">{blog.title}</div>
						<div className="text-slate-500 pt-4">
							Posted on 4th February 2025
						</div>
						<div className="pt-10 text-lg">{blog.content}</div>
					</div>
					<div className="col-span-4 ml-10">
						<div className="flex">
							<div className="flex flex-col justify-center">
								<Avatar size="big" name={blog.author.name} />
							</div>
							<div className="pl-8 space-y-2">
								<div className="text-slate-600 text-lg">Author</div>
								<div className="text-xl font-bold">{blog.author.name}</div>
								<div className="text-slate-700">
									Random catch phrase about the author's ability to grab the
									user attention
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FullBlog;
