import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
	return (
		<div>
			<div className="lg:grid lg:grid-cols-2">
				<div>
					<Auth type={"signin"} />
				</div>
				<div className="hidden lg:block">
					<Quote />
				</div>
			</div>
		</div>
	);
};

export default Signin;
