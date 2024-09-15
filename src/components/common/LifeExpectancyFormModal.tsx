import { useForm, SubmitHandler } from "react-hook-form";
import { useLifeExpectancyStore } from "../../stores/useLifeExpectancyStore";
import { useEffect } from "react";
import {
	FormLifeExpectancyData,
	LifeExpectancyFormModalProps,
} from "../../types/LifeExpectancy.types";

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormLifeExpectancyData>({
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
				className="bg-black bg-opacity-45 p-8 rounded-xl shadow-xl w-1/2 h-2/3 max-w-4xl flex flex-col justify-between gap-4"
			>
				<h1 className="font-black text-2xl">
					Configure Personal Data to handle your life expectancy :)
				</h1>
				<label>When were you born?</label>
				<input
					className="text-black rounded-sm p-2 w-full"
					type="date"
					{...register("bornDate", {
						required: "Born date is required",
						validate: (value) =>
							!isDateInFuture(value) || "Date cannot be in the future",
					})}
				/>
				{errors.bornDate && (
					<p className="text-red-500">{errors.bornDate.message}</p>
				)}

				<label>Exercise Amount</label>
				<select
					className="text-black rounded-sm p-2 w-full"
					{...register("exerciseCategory", {
						required: "Exercise category is required",
					})}
				>
					<option value="sedentary">Sedentary: Little or not exercise</option>
					<option value="light">Light: exercise 1/3 times/week</option>
					<option value="moderate">Moderate: exercise 4-5 times/week</option>
					<option value="active">
						Active: daily exercise or intense exercise 3-4 times/week
					</option>
					<option value="very active">
						Very Active: intense exercise 6-7 times/week
					</option>
					<option value="extra active">
						Extra Active: very intense exercise daily, or physical job
					</option>
				</select>
				{errors.exerciseCategory && (
					<p className="text-red-500">{errors.exerciseCategory.message}</p>
				)}

				<label>Sex</label>
				<select
					className="text-black rounded-sm p-2 w-full"
					{...register("sex", { required: "Sex is required" })}
				>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
				{errors.sex && <p className="text-red-500">{errors.sex.message}</p>}

				<label>Height (cm)</label>
				<input
					className="text-black rounded-sm p-2 w-full"
					type="number"
					{...register("height", { required: "Height is required" })}
				/>
				{errors.height && (
					<p className="text-red-500">{errors.height.message}</p>
				)}

				<label>Weight (kg)</label>
				<input
					className="text-black rounded-sm p-2 w-full"
					type="number"
					{...register("weight", { required: "Weight is required" })}
				/>
				{errors.weight && (
					<p className="text-red-500">{errors.weight.message}</p>
				)}

				<button
					type="submit"
					className="hover:bg-teal-500 text-white font-bold py-4 px-6 rounded transition-all duration-300 ease-in-out"
				>
					Save Data
				</button>
			</form>
		</div>
	);
}
