import { FC, ReactNode } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { useAppSelector } from "@/shared/lib/hooks";
import { sovietTheme } from "../theme/soviet";
import { sovietDarkTheme } from "../theme/soviet.dark";

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const { mode } = useAppSelector((state) => state.theme);

	return <MUIThemeProvider theme={mode === "base" ? sovietTheme : sovietDarkTheme}>{children}</MUIThemeProvider>;
};
