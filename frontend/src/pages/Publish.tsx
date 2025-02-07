import axios from "axios";
import AppBar from "../components/AppBar";
import TextEditor from "../components/TextEditor";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const publishBlog = async () => {
		setLoading(true);
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/blog`,
			{
				title,
				content,
			},
			{
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			}
		);
		navigate(`/blog/${response.data.blog.id}`);
		setLoading(false);
	};

	return (
		<div className="">
			<AppBar />
			<div className="flex justify-center mt-14">
				<div className="w-full max-w-screen-lg">
					<input
						type="text"
						id="helper-text"
						aria-describedby="helper-text-explanation"
						className="font-serif text-gray-900 border-l text-4xl rounded-lg block w-full h-32 p-2.5 px-12 focus:outline-none"
						placeholder="Title"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
			</div>
			<TextEditor onChange={(e) => setContent(e.target.value)} />
			<div className="flex justify-center mb-4 rounded-lg mt-8">
				<div className="px-4 py-2 rounded-lg w-full max-w-screen-lg">
					<button
						type="submit"
						className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 cursor-pointer disabled:cursor-not-allowed"
						disabled={loading}
						onClick={publishBlog}
					>
						{loading ? "Publishing..." : "Publish post"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Publish;
