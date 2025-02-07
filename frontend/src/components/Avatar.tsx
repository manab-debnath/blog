const Avatar = ({
	name,
	size = "small",
}: {
	name: string;
	size?: "small" | "big";
}) => {
	return (
		<div
			className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
				size === "small" ? "w-6 h-6" : "w-10 h-10"
			}`}
		>
			<span className={`${size === "small" ? 'text-xs' : 'text-lg'} font-extralight text-white`}>{name[0]}</span>
		</div>
	);
};

export default Avatar;
