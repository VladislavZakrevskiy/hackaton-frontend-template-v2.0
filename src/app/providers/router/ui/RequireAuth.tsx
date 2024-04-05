import { UserRoles, getUserAuthData, getUserRoles } from "@/entities/User";
import { getRouteMain, getRouteNotFound } from "@/shared/consts/router";
import { FC, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
	children?: ReactNode;
	roles?: UserRoles[];
}

export const RequireAuth: FC<Props> = ({ children, roles }) => {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();
	const userRoles = useSelector(getUserRoles);

	const hasRequiredRoles = useMemo(() => {
		if (!roles) {
			return true;
		}
		return roles.some((requireRole) => userRoles?.includes(requireRole));
	}, [roles, userRoles]);

	if (!auth) {
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
	}

	if (!hasRequiredRoles) {
		return <Navigate to={getRouteNotFound()} state={{ from: location }} replace />;
	}

	return children;
};
