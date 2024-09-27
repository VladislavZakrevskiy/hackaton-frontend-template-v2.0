import { createTheme } from "@mui/material";

export const sovietDarkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#B71C1C", // Красный цвет
		},
		secondary: {
			main: "#FBC02D", // Желтый цвет
		},
		background: {
			default: "#424242", // Темный фон
			paper: "#616161", // Темная бумага
		},
		text: {
			primary: "#FFFFFF", // Белый текст
			secondary: "#BDBDBD", // Светло-серый текст
		},
	},
	typography: {
		fontFamily: '"Soviet", "PT Serif", "Roboto", sans-serif',
		h1: {
			fontFamily: '"Soviet", sans-serif',
			fontWeight: 700,
			fontSize: "2rem",
			color: "#FBC02D",
		},
		h2: {
			fontFamily: '"Soviet", sans-serif',
			fontWeight: 600,
			fontSize: "1.5rem",
			color: "#BDBDBD",
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
