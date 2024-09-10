import BackgroundWrapper from "./components/layout/BackgroundWrapper";
import TimeLeft from "./components/layout/TimeLeft";

function App() {
	return (
		<BackgroundWrapper className="w-full h-full flex align-middle items-center justify-center flex-col gap-8">
			<section>This is a test</section>
			<TimeLeft />
		</BackgroundWrapper>
	);
}

export default App;
