import { useLifeExpectancyStore } from "../../stores/useLifeExpectancyStore";
import { useState } from "react";
import LifeExpectancyFormModal from "../common/LifeExpectancyFormModal";

export default function TimeLeft() {
	const { calculateLifeExpectancy, bornDate } = useLifeExpectancyStore();
	const [openLifeExpectancyModal, setOpenLifeExpectancyModal] = useState(false);

	const lifeExpectancy = calculateLifeExpectancy();
	const birthDate = new Date(bornDate);
	const currentDate = new Date();
	const age = currentDate.getFullYear() - birthDate.getFullYear();
	const yearsLeft = lifeExpectancy - age;

	function handleOpenLifeExpectancyModal() {
		setOpenLifeExpectancyModal(!openLifeExpectancyModal);
	}

	return (
		<>
			<div className="p-8  flex flex-col gap-12">
				<p className="font-black text-center text-8xl text-shadow-lg">
					{yearsLeft} years left, before you die ☠
				</p>
				<button
					onClick={handleOpenLifeExpectancyModal}
					className=" "
				>
					Set your life expectancy data
				</button>
			</div>

			{openLifeExpectancyModal && (
				<LifeExpectancyFormModal onClose={handleOpenLifeExpectancyModal} />
			)}
		</>
	);
}
