import { ChangeEvent } from "react";

const TextEditor = ({
	onChange,
}: {
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
	return (
		<div>
			<div className="flex flex-col justify-center">
				<div className="flex justify-center mb-4 border-gray-200 rounded-lg mt-8">
					<div className="px-4 py-2 border-l rounded-lg w-full max-w-screen-lg">
						<textarea
							id="editor"
							rows={8}
							className="block w-full px-2 py-4 text-lg text-gray-800 border-0 focus:outline-none font-serif min-h-96"
							placeholder="Write an article..."
							required
							onChange={onChange}
						></textarea>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TextEditor;
