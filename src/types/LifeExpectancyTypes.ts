export interface FormLifeExpectancyData {
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
}

export interface LifeExpectancyFormModalProps {
	onClose: () => void;
}
