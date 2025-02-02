import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@manab-debnath/blog-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

//  middlewares
blogRouter.use("/*", async (c, next) => {
	// get the header
	// verify the header
	// if the header is correct, we can proceed
	// if not, we return the user 403 status code
	try {
		const header = c.req.header("Authorization") || "";
		const token = header.split(" ")[1];
		const user = await verify(token, c.env.JWT_SECRET);

		if (user) {
			c.set("userId", String(user.id));
			await next();
		} else {
			c.status(403);
			return c.json({ message: "User not logged in" });
		}
	} catch (error) {
		c.status(403);
		return c.json({ message: "User not logged in" });
	}
});

// create a new blog
blogRouter.post("/", async (c) => {
	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({
			message: "Inputs are not correct",
		});
	}

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const userId = c.get("userId");

	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId,
		},
	});

	c.status(201);
	return c.json({
		message: "you have created a blog",
		blog,
	});
});

// update existing blog
blogRouter.put("/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const blogId = c.req.param("id");
	const userId = c.get("userId");
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({
			message: "Inputs are not correct",
		});
	}

	const blog = await prisma.post.update({
		where: {
			id: blogId,
			authorId: userId,
		},
		data: {
			title: body.title,
			content: body.content,
			authorId: userId,
		},
	});

	c.status(200);
	return c.json({
		message: "you have updated the blog successfully",
		blog,
	});
});

// get all blogs
// TODO: add pagination
blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogs = await prisma.post.findMany();
	console.log(blogs);

	return c.json({ blogs });
});

// get blog by id
blogRouter.get("/get/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogId = c.req.param("id");

	try {
		const blog = await prisma.post.findFirst({
			where: {
				id: blogId,
			},
		});

		c.status(200);
		return c.json({
			message: "fetched successfully",
			blog,
		});
	} catch (error) {
		c.status(411);
		return c.json({
			message: "error while fetching blog post",
		});
	}
});
