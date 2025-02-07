import { Circle } from "./BlogCard";

const Skeleton = () => {
	return (
		<div role="status" className="max-w-screen-md animate-pulse">
			<div className="border-b-1 border-slate-200 p-4 group">
				<div className="flex">
					<div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
					<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
					<div className="flex justify-center flex-col pl-2">
						<Circle />
					</div>
					<div className="pl-2 font-thin text-sm text-slate-500 flex justify-center flex-col">
						<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
					</div>
				</div>
				<div className="text-xl font-semibold group-hover:underline pt-2">
					<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
				</div>
				<div className="font-thin text-xl">
					<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
				</div>
				<div className="text-sm font-thin text-slate-500 pt-4">
					<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
				</div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default Skeleton;
