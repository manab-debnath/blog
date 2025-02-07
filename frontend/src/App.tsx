import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import { useEffect } from "react";

function App() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const publicPaths = ["/signup", "/signin"];

		if (!token && !publicPaths.includes(location.pathname)) {
			navigate("/signup");
		}
	}, [navigate]);

	return (
		<Routes>
			<Route path="/signup" element={<Signup />} />
			<Route path="/signin" element={<Signin />} />
			<Route path="/blogs" element={<Blogs />} />
			<Route path="/blog/:id" element={<Blog />} />
			<Route path="/publish" element={<Publish />} />
		</Routes>
	);
}

export default App;
