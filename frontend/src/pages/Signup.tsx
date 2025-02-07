import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signup = () => {
	return (
		<div>
			<div className="lg:grid lg:grid-cols-2">
				<div>
					<Auth type={"signup"} />
				</div>
				<div className="hidden lg:block">
					<Quote />
				</div>
			</div>
		</div>
	);
};

export default Signup;
