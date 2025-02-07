import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
	title: string;
	content: string;
	id: string;
	author: {
		name: string;
	};
}

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setBlog(response.data.blog);
				setLoading(false);
			});
	}, [id]);

	return {
		loading,
		blog,
	};
};
