import { Suspense, useEffect } from "react";
import { AppRouter } from "./providers/router";
import { useGetMeQuery } from "@/entities/User/api/userApi";
import { useUserActions } from "@/entities/User";
import { PageLoader } from "@/widgets/PageLoader";

const App = () => {
	const { data: user, isLoading } = useGetMeQuery(undefined);
	const { setAuthData } = useUserActions();

	useEffect(() => {
		if (user) setAuthData(user);
	}, [user]);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div>
			<Suspense fallback={<PageLoader />}>
				{/* <Navbar /> */}
				<div className="content-page">
					{/* <Sidebar /> */}
					<AppRouter />
				</div>
			</Suspense>
		</div>
	);
};

export default App;
