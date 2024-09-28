import { memo, useCallback } from "react";
import { useAppSelector } from "@/shared/lib/hooks";
import { useThemeActions } from "@/app/providers/ThemeProvider";

export const ThemeSwitcher = memo(() => {
	const { setTheme } = useThemeActions();
	const { mode } = useAppSelector((state) => state.theme);
	const image_url = mode === "base" ? "/public/themes/lenin.png" : "/public/themes/stalin.png";

	const onToggle = useCallback(() => {
		setTheme(mode === "base" ? "dark" : "base");
	}, [mode]);

	return (
		<button onClick={onToggle}>
			<img className="w-[25px] h-[25px] mx-2" src={image_url} alt={mode + " theme icon"} />
		</button>
	);
});
