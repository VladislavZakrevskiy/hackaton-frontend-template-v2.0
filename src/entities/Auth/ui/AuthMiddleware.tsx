import { useLazyGetMeQuery, useLazyRefreshQuery, useUserActions } from "@/entities/User";
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from "@/shared/consts/localStorage";
import { getRouteLogin, getRouteRegister } from "@/shared/consts/router";
import { useAppSelector } from "@/shared/lib/hooks";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const navigate = useNavigate();
	const { authData } = useAppSelector((state) => state.user);
	const { setAuthData } = useUserActions();
	const refresh_token = localStorage.getItem(USER_REFRESH_TOKEN);
	const [refresh] = useLazyRefreshQuery();
	const [getMe] = useLazyGetMeQuery();
	const { pathname } = useLocation();

	console.log(pathname);

	useEffect(() => {
		const checkAuth = async () => {
			if ([getRouteLogin(), getRouteRegister()].includes(pathname)) {
				return;
			}
			if (authData) {
				return;
			}

			if (refresh_token) {
				try {
					const { data, isError } = await refresh();
					if (isError || data === undefined) {
						navigate(getRouteLogin());
						return;
					}
					localStorage.setItem(USER_REFRESH_TOKEN, data.refreshToken);
					localStorage.setItem(USER_ACCESS_TOKEN, data.accessToken);
					const { data: user } = await getMe();
					if (user) {
						setAuthData(user);
					}
				} catch (error) {
					navigate(getRouteLogin());
					return;
				}
			} else {
				navigate(getRouteLogin());
			}
		};
		checkAuth();
	}, []);

	return <>{children}</>;
};
