import { create } from "zustand";
import { LifeExpectancyState } from "./lifeExpectancyType";

export const useLifeExpectancyStore = create<LifeExpectancyState>(
	(set, get) => {
		const storedBornDate = localStorage.getItem("bornDate") || "0000-00-00";
		const storedExercise = Number(localStorage.getItem("exercise")) || 0;
		const storedExerciseCategory =
			(localStorage.getItem("exerciseCategory") as
				| "sedentary"
				| "light"
				| "moderate"
				| "active"
				| "very active"
				| "extra active") || "sedentary";
		const storedSex =
			(localStorage.getItem("sex") as "male" | "female") || "male";
		const storedHeight = Number(localStorage.getItem("height")) || 170;
		const storedWeight = Number(localStorage.getItem("weight")) || 70;

		const baseLifeExpectancy = storedSex === "male" ? 72 : 80;

		return {
			bornDate: storedBornDate,
			exercise: storedExercise,
			exerciseCategory: storedExerciseCategory,
			sex: storedSex,
			height: storedHeight,
			weight: storedWeight,
			baseLifeExpectancy: baseLifeExpectancy,

			setBornDate: (date: string) => {
				localStorage.setItem("bornDate", date);
				set({ bornDate: date });
			},

			setExerciseAmount: (amount: number) => {
				localStorage.setItem("exercise", String(amount));
				set({ exercise: amount });
			},

			setExerciseCategory: (
				category:
					| "sedentary"
					| "light"
					| "moderate"
					| "active"
					| "very active"
					| "extra active"
			) => {
				localStorage.setItem("exerciseCategory", category);
				set({ exerciseCategory: category });
			},

			setSex: (sex: "male" | "female") => {
				localStorage.setItem("sex", sex);
				const newBaseLifeExpectancy = sex === "male" ? 72 : 80;
				set({ sex, baseLifeExpectancy: newBaseLifeExpectancy });
			},

			setHeight: (height: number) => {
				localStorage.setItem("height", String(height));
				set({ height });
			},

			setWeight: (weight: number) => {
				localStorage.setItem("weight", String(weight));
				set({ weight });
			},

			calculateLifeExpectancy: () => {
				const state = get();
				const additionalYears = state.exercise; // Modify this logic as needed based on actual calculations
				let adjustedLifeExpectancy = state.baseLifeExpectancy;

				// Adjust life expectancy based on exercise category
				switch (state.exerciseCategory) {
					case "sedentary":
						adjustedLifeExpectancy -= 5; // Example adjustment for sedentary
						break;
					case "light":
						adjustedLifeExpectancy -= 2; // Example adjustment for light
						break;
					case "moderate":
						// No adjustment for moderate
						break;
					case "active":
						adjustedLifeExpectancy += 2; // Example adjustment for active
						break;
					case "very active":
						adjustedLifeExpectancy += 5; // Example adjustment for very active
						break;
					case "extra active":
						adjustedLifeExpectancy += 7; // Example adjustment for extra active
						break;
				}

				return adjustedLifeExpectancy + additionalYears;
			},
		};
	}
);
