export function calculateLifeExpectancyData(
	calculateLifeExpectancy: () => number,
	bornDate: string
) {
	const lifeExpectancy = calculateLifeExpectancy();
	const birthDate = new Date(bornDate);
	const currentDate = new Date();

	let age = currentDate.getFullYear() - birthDate.getFullYear();

	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();
	const birthMonth = birthDate.getMonth();
	const birthDay = birthDate.getDate();

	if (
		currentMonth < birthMonth ||
		(currentMonth === birthMonth && currentDay < birthDay)
	) {
		age--;
	}

	const yearsLeft = lifeExpectancy - age;
	const seasonsLeft = yearsLeft * 4;
	const productiveYearsLeft = Math.max(0, 60 - age);

	return {
		lifeExpectancy,
		birthDate,
		currentDate,
		age,
		yearsLeft,
		seasonsLeft,
		productiveYearsLeft,
	};
}
