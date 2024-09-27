import { LoginForm } from "@/features/Auth";
import { Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const nav = useNavigate();
	const { t } = useTranslation();

	return (
		<Container
			sx={{
				backgroundImage: "url(/login.JPG)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			className="w-screen h-screen flex justify-center items-center"
		>
			<LoginForm />
			<Button
				onClick={() => nav("/register")}
				sx={{ position: "absolute" }}
				className="absolute bottom-4"
				variant="contained"
				size="large"
			>
				{t("register")}
			</Button>
		</Container>
	);
};

export default LoginPage;
