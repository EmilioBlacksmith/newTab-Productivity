import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState, useEffect } from "react";
import DateForm from "../common/DateForm";

export default function TimeLeft() {
	const [storedBornDate] = useLocalStorage<string>("bornDate", "0000-00-00");
	const [openBornDateModal, setOpenBornDateModal] = useState(false);
	const [bornDate, setBornDate] = useState("0000-00-00");

	function handleOpenBornDateModal() {
		setOpenBornDateModal(!openBornDateModal);
	}

	useEffect(() => {
		setBornDate(storedBornDate);
	}, [storedBornDate]);

	return (
		<div>
			<p>
				You were born on <span>{bornDate}</span>
			</p>
			<button onClick={handleOpenBornDateModal}>Edit Born Date</button>
			{openBornDateModal ? <DateForm /> : <></>}
		</div>
	);
}
