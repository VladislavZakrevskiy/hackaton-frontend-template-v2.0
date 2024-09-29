import { Avatar, CircularProgress, MenuItem, Select, Typography } from "@mui/material";
import { FC } from "react";
import { useFindUserByProjectIdQuery, useFindUserBySpaceIdQuery } from "../api/profileApi";
import { useTranslation } from "react-i18next";

interface UserSelectProps {
	type: "space" | "project";
	id: number;
	value: number;
	setValue: (q: number) => void;
}

export const UserSelect: FC<UserSelectProps> = ({ type, id, setValue, value }) => {
	const { t } = useTranslation();
	const searshFunc = type === "project" ? useFindUserByProjectIdQuery : useFindUserBySpaceIdQuery;
	const { isLoading, data: users } = searshFunc(id);

	if (isLoading) {
		return (
			<Select>
				<CircularProgress />
			</Select>
		);
	}

	if (!users || users.length === 0) {
		return (
			<Select>
				<MenuItem disabled>{t("no users")}</MenuItem>
			</Select>
		);
	}

	return (
		<Select value={value} onChange={(e) => setValue(Number(e.target.value))}>
			{users.map((user) => (
				<MenuItem value={user.id}>
					<Avatar src={user.image[0]} />
					<Typography>{user.fullName}</Typography>
				</MenuItem>
			))}
		</Select>
	);
};
