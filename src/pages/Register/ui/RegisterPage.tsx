import { RegisterForm } from "@/features/Auth";
import { Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const nav = useNavigate();
	const { t } = useTranslation();

	return (
		<Container
			sx={{
				backgroundImage: "url(/register.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				filter: "brightness(0.9)",
				backgroundColor: "#FFFDD0",
			}}
			className="w-screen h-screen flex justify-center items-center"
		>
			<RegisterForm />
			<Button
				onClick={() => nav("/login")}
				sx={{ position: "absolute" }}
				className="absolute bottom-4"
				variant="contained"
				size="large"
			>
				{t("login_page")}
			</Button>
		</Container>
	);
};

export default RegisterPage;
