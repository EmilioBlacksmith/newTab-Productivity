import { useLifeExpectancyStore } from "../../stores/useLifeExpectancyStore";
import { useState } from "react";
import LifeExpectancyFormModal from "../common/LifeExpectancyFormModal";

export default function TimeLeft() {
	const { bornDate } = useLifeExpectancyStore();
	const [openBornDateModal, setOpenBornDateModal] = useState(false);

	function handleOpenBornDateModal() {
		setOpenBornDateModal(!openBornDateModal);
	}

	return (
		<div>
			<p>
				You were born on <span>{bornDate}</span>
			</p>
			<button onClick={handleOpenBornDateModal}>Edit Born Date</button>
			{openBornDateModal && (
				<LifeExpectancyFormModal onClose={handleOpenBornDateModal} />
			)}
		</div>
	);
}
