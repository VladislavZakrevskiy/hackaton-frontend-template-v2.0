import { createTheme } from "@mui/material";

export const sovietTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#B71C1C", // Красный цвет
		},
		secondary: {
			main: "#FBC02D", // Желтый цвет
		},
		background: {
			default: "#E0E0E0", // Светлый фон
			paper: "#FFFFFF", // Белая бумага
		},
		text: {
			primary: "#212121", // Темный текст
			secondary: "#757575", // Светло-серый текст
		},
	},
	typography: {
		fontFamily: '"Soviet", "PT Serif", "Roboto", sans-serif',
		h1: {
			fontFamily: '"Soviet", sans-serif',
			fontWeight: 700,
			fontSize: "2rem",
			color: "#B71C1C",
		},
		h2: {
			fontFamily: '"Soviet", sans-serif',
			fontWeight: 600,
			fontSize: "1.5rem",
			color: "#757575",
		},
		body1: {
			fontFamily: '"PT Serif", sans-serif',
			fontWeight: 400,
			fontSize: "1rem",
		},
		button: {
			textTransform: "uppercase",
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#B71C1C",
					color: "#FFFFFF",
				},
			},
		},
	},
});
