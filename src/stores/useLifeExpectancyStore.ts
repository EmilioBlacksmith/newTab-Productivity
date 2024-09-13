import { create } from "zustand";
import { LifeExpectancyState } from "./lifeExpectancyType";

export const useLifeExpectancyStore = create<LifeExpectancyState>(
	(set, get) => ({
		bornDate: localStorage.getItem("bornDate") || "0000-00-00",
		exerciseCategory:
			(localStorage.getItem("exerciseCategory") as
				| "sedentary"
				| "light"
				| "moderate"
				| "active"
				| "very active"
				| "extra active") || "sedentary",
		sex: (localStorage.getItem("sex") as "male" | "female") || "male",
		height: Number(localStorage.getItem("height")) || 170,
		weight: Number(localStorage.getItem("weight")) || 70,
		baseLifeExpectancy: 76,

		setBornDate: (date: string) => {
			localStorage.setItem("bornDate", date);
			set({ bornDate: date });
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
			const newBaseLifeExpectancy = sex === "male" ? 76 : 81;
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
			let adjustedLifeExpectancy = state.baseLifeExpectancy;

			const exerciseAdjustment = {
				sedentary: -3,
				light: 0,
				moderate: 1.8,
				active: 3.4,
				"very active": 4.5,
				"extra active": 5.5,
			};
			adjustedLifeExpectancy += exerciseAdjustment[state.exerciseCategory];

			const heightInMeters = state.height / 100;
			const bmi = state.weight / (heightInMeters * heightInMeters);
			if (bmi < 18.5) {
				adjustedLifeExpectancy -= 2;
			} else if (bmi >= 25 && bmi < 30) {
				adjustedLifeExpectancy -= 1;
			} else if (bmi >= 30) {
				adjustedLifeExpectancy -= 3;
			} else {
				adjustedLifeExpectancy += 3;
			}

			const today = new Date();
			const birthDate = new Date(state.bornDate);
			const age = today.getFullYear() - birthDate.getFullYear();
			if (age > 65) {
				adjustedLifeExpectancy += 0.5;
			}

			return Math.round(adjustedLifeExpectancy);
		},
	})
);
