import BackgroundWrapper from "./components/layout/BackgroundWrapper";
import PurposeComponent from "./components/layout/PurposeComponent";
import TimeLeftComponent from "./components/layout/TimeLeftComponent";
import ToDoComponent from "./components/layout/ToDoComponent";

function App() {
	return (
		<BackgroundWrapper className="w-full h-full flex align-middle items-center justify-center flex-row gap-8">
			<TimeLeftComponent />
			<div className="w-1/2 flex flex-col justify-between h-1/2 m-8">
				<PurposeComponent />
				<ToDoComponent />
			</div>
		</BackgroundWrapper>
	);
}

export default App;
