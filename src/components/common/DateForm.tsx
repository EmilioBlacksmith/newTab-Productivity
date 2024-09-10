import { useForm, SubmitHandler } from "react-hook-form";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface Data {
	bornDate: string;
}

export default function DateForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Data>();
	const [, setBornDate] = useLocalStorage<string>("bornDate", "0000-00-00");

	const onSubmit: SubmitHandler<Data> = (data) => {
		setBornDate(data.bornDate);
	};

	const isDateInFuture = (date: string) => {
		const today = new Date();
		const selectedDate = new Date(date);
		return selectedDate > today;
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col align-middle justify-center items-center gap-4 bg-black bg-opacity-60 backdrop-blur-xl p-12 rounded-xl shadow-2xl text-xl"
			>
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
				)}{" "}
				<button
					type="submit"
					className="hover:shadow-md hover:shadow-black p-4 rounded-md ease-in-out transition-all"
				>
					Save Date
				</button>
			</form>
		</>
	);
}
