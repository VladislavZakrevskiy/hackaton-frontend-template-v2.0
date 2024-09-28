import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/SideBar";
import { Navbar } from "@/widgets/Navbar";

const App = () => {
	return (
		<Suspense fallback={<PageLoader />}>
			<Navbar />
			<Sidebar />
			<AppRouter />
		</Suspense>
	);
};

export default App;
