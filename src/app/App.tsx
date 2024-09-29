import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/SideBar";
import { Navbar } from "@/widgets/Navbar";
import { useLocation } from "react-router-dom";
import { getRouteLogin, getRouteMain, getRouteRegister } from "@/shared/consts/router";
import { ModalManager } from "./managers/ModalManager/Modals";

const App = () => {
	const { pathname } = useLocation();

	if (pathname === getRouteMain()) {
		return (
			<Suspense fallback={<PageLoader />}>
				<Navbar />
				<AppRouter />
				<ModalManager />
			</Suspense>
		);
	}

	if ([getRouteLogin(), getRouteRegister()].includes(pathname)) {
		return (
			<Suspense fallback={<PageLoader />}>
				<AppRouter />
				<ModalManager />
			</Suspense>
		);
	}

	return (
		<div className="flex flex-col h-screen max-w-screen">
			<Suspense fallback={<PageLoader />}>
				<Navbar />
				<ModalManager />
				<div className="flex  max-w-[100vw]">
					<Sidebar />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	);
};

export default App;
