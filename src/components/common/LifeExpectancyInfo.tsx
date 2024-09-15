export function LifeExpectancyInfo({
	yearsLeft,
	seasonsLeft,
	productiveYearsLeft,
	age,
}: {
	yearsLeft: number;
	seasonsLeft: number;
	productiveYearsLeft: number;
	age: number;
}) {
	function getProductivityMessage(age: number) {
		if (age < 20)
			return "Your most productive years are slipping away. Every moment wasted is a nail in your coffin of mediocrity.";
		if (age < 30)
			return "You're in your prime, but it's fading fast. Tomorrow, you'll wish you had started today.";
		if (age < 40)
			return "Your peak productivity is behind you. The clock is ticking louder every day.";
		return "Your best years are gone. It's now or never to leave your mark on this world.";
	}

	return (
		<>
			<p className="font-black text-center text-2xl text-shadow-lg animate-pulse">
				<span className="text-3xl text-gray-600">{yearsLeft}</span> years left
				before you die... 💀
			</p>
			<p className="text-center text-shadow-lg">
				Only {seasonsLeft} more seasons until your death...
			</p>
			<p className="text-center text-shadow-lg animate-pulse">
				{productiveYearsLeft} years left of golden productivity...
			</p>
			<p className="text-xs text-gray-600 font-black text-center text-shadow-lg">
				{getProductivityMessage(age)}
			</p>
		</>
	);
}
