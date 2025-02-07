import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const AppBar = () => {
	const [showLogout, setShowLogout] = useState(false);
	const [userName, setUserName] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const storedUserName = localStorage.getItem("userName");
		if (storedUserName) {
			setUserName(storedUserName);
		}
	}, []);

	const toggleLogout = () => {
		setShowLogout((prev) => !prev);
	};

	return (
		<div className="border-b border-slate-200 flex justify-between px-40 py-4">
			<Link to={`/blogs`}>
				<div className="text-2xl font-bold cursor-pointer">Blog</div>
			</Link>
			<div className="flex items-center space-x-4">
				<Link to={"/publish"}>
					<button
						type="button"
						className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer"
					>
						Add Blog
					</button>
				</Link>
				<div className="relative cursor-pointer">
					<div onClick={toggleLogout}>
						<Avatar name={userName} size={"big"} />
					</div>
					{showLogout && (
						<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
							<button
								onClick={() => {
									localStorage.removeItem("token");
									navigate("/signup");
								}}
								className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AppBar;
