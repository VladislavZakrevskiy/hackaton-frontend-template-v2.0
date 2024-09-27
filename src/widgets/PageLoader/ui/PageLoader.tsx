import { CircularProgress } from "@mui/material";

export const PageLoader = () => {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<CircularProgress size={60} />
		</div>
	);
};
