import BackgroundWrapper from "./components/layout/BackgroundWrapper";
import TimeLeftComponent from "./components/layout/TimeLeftComponent";
import ToDoComponent from "./components/layout/ToDoComponent";

function App() {
	return (
		<BackgroundWrapper className="w-full h-full flex align-middle items-center justify-center flex-row gap-8">
			<TimeLeftComponent />
			<ToDoComponent />
		</BackgroundWrapper>
	);
}

export default App;
