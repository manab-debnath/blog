import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@manab-debnath/blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
	const [postInputs, setPostInputs] = useState<SignupInput>({
		name: "",
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function sendRequest() {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
				postInputs
			);
			const jwt = response.data;
			localStorage.setItem("token", jwt);
			localStorage.setItem("userName", postInputs.name || "Anonymous");
			navigate(`/blogs`);
			if (type === "signup") alert("Sign up successful");
			if (type === "signin") alert("Login successful");
		} catch (error) {
			alert("Error while singing in");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="h-screen flex justify-center flex-col">
			<div className="flex justify-center">
				<div className="space-y-6">
					<div className="space-y-2 px-10">
						<div className="text-3xl font-extrabold text-center">
							{type === "signup" ? "Create an account" : "Login to account"}
						</div>
						<div className="text-slate-400 text-center">
							{type === "signup" ? (
								<>
									Already have an account?
									<Link to="/signin" className="underline pl-2">
										Login
									</Link>
								</>
							) : (
								<>
									Don't have an account?
									<Link to="/signup" className="underline pl-2">
										Signup
									</Link>
								</>
							)}
						</div>
					</div>
					<div className="space-y-4">
						{type === "signup" ? (
							<LabelInput
								label="Name"
								placeholder="Enter your name"
								onChange={(e) => {
									setPostInputs((c) => ({ ...c, name: e.target.value }));
								}}
							/>
						) : null}

						<LabelInput
							label="Email"
							placeholder="Enter your email"
							onChange={(e) => {
								setPostInputs((c) => ({ ...c, email: e.target.value }));
							}}
						/>
						<LabelInput
							label="Password"
							placeholder="Enter your password"
							type="password"
							onChange={(e) => {
								setPostInputs((c) => ({ ...c, password: e.target.value }));
							}}
						/>
						<button
							type="button"
							className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:cursor-pointer mt-4 disabled:cursor-not-allowed"
							onClick={sendRequest}
							disabled={isLoading}
						>
							{isLoading
								? "Loading..."
								: type === "signup"
								? "Sign up"
								: "Login"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

interface LabelInputType {
	label: string;
	placeholder: string;
	type?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelInput({ label, placeholder, type, onChange }: LabelInputType) {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-black">
				{label}
			</label>
			<input
				type={type || "text"}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				required
				onChange={onChange}
			/>
		</div>
	);
}

export default Auth;
