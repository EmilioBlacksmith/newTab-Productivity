export interface LifeExpectancyState {
	bornDate: string;
	exerciseCategory:
		| "sedentary"
		| "light"
		| "moderate"
		| "active"
		| "very active"
		| "extra active";
	sex: "male" | "female";
	height: number;
	weight: number;
	baseLifeExpectancy: number;

	setBornDate: (date: string) => void;
	setExerciseCategory: (
		category:
			| "sedentary"
			| "light"
			| "moderate"
			| "active"
			| "very active"
			| "extra active"
	) => void;
	setSex: (sex: "male" | "female") => void;
	setHeight: (height: number) => void;
	setWeight: (weight: number) => void;
	calculateLifeExpectancy: () => number;
}
