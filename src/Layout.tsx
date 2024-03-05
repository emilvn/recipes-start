import NavHeader from "./NavHeader";
import "./layout.css";
import {Toaster} from "react-hot-toast";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
	return (
		<div className="app-layout">
			<header className="nav-header">
				<NavHeader/>
			</header>
			<main className="page-content">{children}</main>
			<Toaster position={"bottom-center"}/>
		</div>
	);
};

export default Layout;
