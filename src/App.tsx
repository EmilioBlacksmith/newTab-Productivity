import BackgroundWrapper from "./components/layout/BackgroundWrapper";
import TimeLeftComponent from "./components/layout/TimeLeft";

function App() {
	return (
		<BackgroundWrapper className="w-full h-full flex align-middle items-center justify-center flex-col gap-8">
			<TimeLeftComponent />
		</BackgroundWrapper>
	);
}

export default App;
