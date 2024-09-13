import { useLifeExpectancyStore } from "../../stores/useLifeExpectancyStore";
import { useState, useEffect } from "react";
import LifeExpectancyFormModal from "../common/LifeExpectancyFormModal";

export default function TimeLeft() {
	const { calculateLifeExpectancy, bornDate } = useLifeExpectancyStore();
	const [openLifeExpectancyModal, setOpenLifeExpectancyModal] = useState(false);
	const [secondsLeft, setSecondsLeft] = useState(86400);
	const [motivationalQuote, setMotivationalQuote] = useState("");

	const lifeExpectancy = calculateLifeExpectancy();
	const birthDate = new Date(bornDate);
	const currentDate = new Date();
	const age = currentDate.getFullYear() - birthDate.getFullYear();
	const yearsLeft = lifeExpectancy - age;

	const seasonsLeft = yearsLeft * 4;
	const productiveYearsLeft = Math.max(0, 60 - age);
	const daysLeft = yearsLeft * 365;
	const heartsLeft = yearsLeft * 365 * 24 * 60 * 90; // Assuming 90 heartbeats per minute
	const coffeeLeft = yearsLeft * 365; // Assuming 1 coffee per day

	useEffect(() => {
		const timer = setInterval(() => {
			setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 86400));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const quotes = [
			"Every second you waste is a second closer to your death. Get to work!",
			"Your future self is watching you right now through memories. Make them proud!",
			"You're dying with every breath. Make it count!",
			"Time is the only resource you can't get back. Stop wasting it!",
			"Your potential is infinite. Your time is not. Act now!",
		];
		const interval = setInterval(() => {
			setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	function getProductivityMessage(age: number) {
		if (age < 20)
			return "Your most productive years are slipping away. Every moment wasted is a nail in your coffin of mediocrity.";
		if (age < 30)
			return "You're in your prime, but it's fading fast. Tomorrow, you'll wish you had started today.";
		if (age < 40)
			return "Your peak productivity is behind you. The clock is ticking louder every day.";
		return "Your best years are gone. It's now or never to leave your mark on this world.";
	}

	function handleOpenLifeExpectancyModal() {
		setOpenLifeExpectancyModal(!openLifeExpectancyModal);
	}

	return (
		<>
			<div className="p-8 flex flex-col gap-8 bg-black bg-opacity-50 rounded-lg backdrop-blur ">
				<p className="font-black text-center text-8xl text-shadow-lg animate-pulse">
					{yearsLeft} years left before you die... 💀
				</p>
				<p className="text-4xl text-center text-shadow-lg">
					Only {seasonsLeft} more seasons until your death...
				</p>
				<p className="text-3xl text-center text-shadow-lg animate-pulse">
					{productiveYearsLeft} years left of golden productivity...
				</p>
				<p className="text-2xl text-center text-shadow-lg">
					{getProductivityMessage(age)}
				</p>
				<div className="text-xl text-center text-shadow-lg">
					<p>Your remaining existence in numbers:</p>
					<p className="font-bold">
						{daysLeft.toLocaleString()} sunrises left to witness
					</p>
					<p className="font-bold">
						{heartsLeft.toLocaleString()} heartbeats until your final rest
					</p>
					<p className="font-bold">
						{coffeeLeft.toLocaleString()} cups of coffee until your last sip
					</p>
					<p className="font-bold animate-pulse">
						{secondsLeft} seconds until another day is lost to the void
					</p>
				</div>
				<p className="text-xl font-bold text-center text-shadow-lg">
					{motivationalQuote}
				</p>
				<button
					onClick={handleOpenLifeExpectancyModal}
					className=" hover:bg-red-900 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
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
