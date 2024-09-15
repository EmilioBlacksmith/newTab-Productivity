export function LifeBoxes({
	age,
	yearsLeft,
	lifeExpectancy,
}: {
	age: number;
	yearsLeft: number;
	lifeExpectancy: number;
}) {
	const filledBoxes = age;
	const emptyBoxes = yearsLeft;

	const renderBoxes = () => {
		const boxes = [];
		for (let i = 1; i <= filledBoxes; i++) {
			boxes.push(
				<div
					key={`filled-${i}`}
					className="w-6 h-6 bg-gray-600 rounded shadow-lg flex justify-center items-center"
				>
					{i}
				</div>
			);
		}
		for (let i = 1; i <= emptyBoxes; i++) {
			boxes.push(
				<div
					key={`empty-${i}`}
					className="w-6 h-6 bg-white rounded shadow-lg flex justify-center items-center"
				></div>
			);
		}
		boxes.push(
			<div
				key={`empty-${lifeExpectancy}`}
				className="w-6 h-6 bg-gray-600 rounded flex justify-center items-center shadow-lg"
			>
				💀
			</div>
		);
		return boxes;
	};

	return (
		<div className="grid grid-cols-12 gap-1 place-items-center">
			{renderBoxes()}
		</div>
	);
}
