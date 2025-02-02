import { useLifeExpectancyStore } from "../../stores/useLifeExpectancyStore";
import { useState } from "react";
import { LifeExpectancyInfo } from "../common/LifeExpectancyInfo";
import { MotivationalQuotes } from "../common/MotivationalQuotes";
import { LifeBoxes } from "../common/LifeBoxes";
import LifeExpectancyFormModal from "../common/LifeExpectancyFormModal";
import { calculateLifeExpectancyData } from "../../utils/lifeExpectancyCalculator";

export default function TimeLeftComponent() {
	const { calculateLifeExpectancy, bornDate } = useLifeExpectancyStore();
	const [openLifeExpectancyModal, setOpenLifeExpectancyModal] = useState(false);

	const { age, yearsLeft, seasonsLeft, productiveYearsLeft, lifeExpectancy } =
		calculateLifeExpectancyData(calculateLifeExpectancy, bornDate);

	function handleOpenLifeExpectancyModal() {
		setOpenLifeExpectancyModal(!openLifeExpectancyModal);
	}

	const hasValidData = (value: any) =>
		value !== null && value !== undefined && !isNaN(value);

	const shouldDisplayLifeExpectancy =
		hasValidData(age) &&
		hasValidData(yearsLeft) &&
		hasValidData(seasonsLeft) &&
		hasValidData(productiveYearsLeft) &&
		hasValidData(lifeExpectancy);

	return (
		<>
			<div className="p-4 flex flex-col align-middle justify-center gap-4 bg-black bg-opacity-75 w-1/2 m-8 text-sm rounded-lg backdrop-blur ">
				{shouldDisplayLifeExpectancy ? (
					<>
						<LifeExpectancyInfo
							yearsLeft={yearsLeft}
							seasonsLeft={seasonsLeft}
							productiveYearsLeft={productiveYearsLeft}
							age={age}
						/>
						<LifeBoxes
							age={age}
							yearsLeft={yearsLeft}
							lifeExpectancy={lifeExpectancy}
						/>
						<MotivationalQuotes />
					</>
				) : (
					<p className="font-black text-center text-2xl text-shadow-lg animate-pulse">
						Are you ready to see how much time you have left?
					</p>
				)}

				<button
					onClick={handleOpenLifeExpectancyModal}
					className="hover:bg-teal-500 text-white font-bold py-4 px-6 rounded transition-all duration-300 ease-in-out"
				>
					Confront Your Mortality
				</button>
			</div>
			{openLifeExpectancyModal && (
				<LifeExpectancyFormModal onClose={handleOpenLifeExpectancyModal} />
			)}
		</>
	);
}
