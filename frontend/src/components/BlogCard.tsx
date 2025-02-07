import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
	id: string;
}

const BlogCard = ({
	id,
	authorName,
	title,
	content,
	publishedDate,
}: BlogCardProps) => {
	return (
		<Link to={`/blog/${id}`}>
			<div className="border-b-1 border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition hover:scale-110 ease-in-out group">
				<div className="flex">
					<Avatar name={authorName} />
					<div className="font-extralight text-sm pl-2 flex justify-center flex-col">
						{authorName}
					</div>
					<div className="flex justify-center flex-col pl-2">
						<Circle />
					</div>
					<div className="pl-2 font-thin text-sm text-slate-500 flex justify-center flex-col">
						{publishedDate}
					</div>
				</div>
				<div className="text-xl font-semibold group-hover:underline pt-2">
					{title}
				</div>
				<div className="font-thin text-xl">
					{content.length > 100 ? content.slice(0, 100) + "....." : content}
				</div>
				<div className="text-sm font-thin text-slate-500 pt-4">{`${Math.ceil(
					content.length / 1000
				)} minute(s) read`}</div>
			</div>
		</Link>
	);
};

export function Circle() {
	return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}

export default BlogCard;
