import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
		ORIGIN_URL: string;
	};
}>();

app.use(async (c, next) => {
	app.use(
		"/api/v1/*",
		cors({
			origin: c.env.ORIGIN_URL,
			allowMethods: ["GET", "POST", "PUT", "DELETE"],
			allowHeaders: ["Content-Type", "Authorization"],
		})
	);

	await next();
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
