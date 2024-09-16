import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useLifeExpectancyStore } from "../../stores/useLifeExpectancyStore";
import { useEffect } from "react";
import {
	FormLifeExpectancyData,
	LifeExpectancyFormModalProps,
} from "../../types/LifeExpectancy.types";
import { CustomDropdown, CustomInput } from "../../utils/CustomInputs";

export default function LifeExpectancyFormModal({
	onClose,
}: LifeExpectancyFormModalProps) {
	const {
		bornDate,
		exerciseCategory,
		sex,
		height,
		weight,
		setBornDate,
		setExerciseCategory,
		setSex,
		setHeight,
		setWeight,
	} = useLifeExpectancyStore();

	const { control, handleSubmit, reset } = useForm<FormLifeExpectancyData>({
		defaultValues: {
			bornDate,
			exerciseCategory,
			sex,
			height,
			weight,
		},
	});

	useEffect(() => {
		reset({
			bornDate,
			exerciseCategory,
			sex,
			height,
			weight,
		});
	}, [bornDate, exerciseCategory, sex, height, weight, reset]);

	const onSubmit: SubmitHandler<FormLifeExpectancyData> = (data) => {
		setBornDate(data.bornDate);
		setExerciseCategory(data.exerciseCategory);
		setSex(data.sex);
		setHeight(data.height);
		setWeight(data.weight);
		onClose();
	};

	const isDateInFuture = (date: string) => {
		const today = new Date();
		const selectedDate = new Date(date);
		return selectedDate > today;
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="relative bg-black bg-opacity-45 p-8 rounded-xl shadow-xl w-1/2 h-2/3 max-w-4xl flex flex-col justify-between gap-4"
			>
				<h1 className="font-black text-2xl">
					Configure Personal Data to handle your life expectancy :)
				</h1>

				<CustomInput
					label="When were you born?"
					name="bornDate"
					control={control}
					rules={{
						required: "Born date is required",
						validate: (value: string) =>
							!isDateInFuture(value) || "Date cannot be in the future",
					}}
					type="date"
				/>

				<Controller
					name="exerciseCategory"
					control={control}
					rules={{ required: "Exercise category is required" }}
					render={({ field }) => (
						<CustomDropdown
							options={[
								{
									value: "sedentary",
									label: "Sedentary: Little or no exercise",
								},
								{ value: "light", label: "Light: exercise 1-3 times/week" },
								{
									value: "moderate",
									label: "Moderate: exercise 4-5 times/week",
								},
								{
									value: "active",
									label:
										"Active: daily exercise or intense exercise 3-4 times/week",
								},
								{
									value: "very active",
									label: "Very Active: intense exercise 6-7 times/week",
								},
								{
									value: "extra active",
									label:
										"Extra Active: very intense exercise daily, or physical job",
								},
							]}
							value={field.value}
							onChange={field.onChange}
							label="Exercise Amount"
						/>
					)}
				/>

				<Controller
					name="sex"
					control={control}
					rules={{ required: "Sex is required" }}
					render={({ field }) => (
						<CustomDropdown
							options={[
								{ value: "male", label: "Male" },
								{ value: "female", label: "Female" },
							]}
							value={field.value}
							onChange={field.onChange}
							label="Sex"
						/>
					)}
				/>

				<CustomInput
					label="Height (cm)"
					name="height"
					control={control}
					rules={{ required: "Height is required" }}
					type="number"
					min="0"
				/>

				<CustomInput
					label="Weight (kg)"
					name="weight"
					control={control}
					rules={{ required: "Weight is required" }}
					type="number"
					min="0"
				/>

				<button
					type="submit"
					className="bg-black bg-opacity-40 bg-backdrop-blur p-4 hover:bg-teal-700 rounded transition-all duration-150 ease-in-out focus:outline-none"
				>
					Save Data
				</button>
			</form>
		</div>
	);
}
