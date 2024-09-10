import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className="w-screen h-screen overflow-hidden text-white">
			<App />
		</div>
	</StrictMode>
);
