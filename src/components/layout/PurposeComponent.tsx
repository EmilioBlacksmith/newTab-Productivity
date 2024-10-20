import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomInput } from "../../utils/CustomInputs";

type FormValues = {
	purpose: string;
};

const PurposeComponent: React.FC = () => {
	const [purpose, setPurpose] = useLocalStorage<string>("purpose", "");
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { control, handleSubmit, setValue } = useForm<FormValues>();

	useEffect(() => {
		setValue("purpose", purpose);
	}, [purpose, setValue]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (data.purpose.trim()) {
			setPurpose(data.purpose.trim());
			setIsEditing(false);
		}
	};

	return (
		<div className="p-4 flex flex-col align-middle justify-center gap-2 bg-black bg-opacity-75 w-full text-base rounded-lg backdrop-blur">
			<h2 className="font-bold text-xl text-gray-600 text-shadow-lg">
				Your goal/purpose:
			</h2>
			{isEditing ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-2"
				>
					<CustomInput
						label="Why are you not procrastinating?"
						name="purpose"
						control={control}
						rules={{ required: "Purpose is required" }}
						type="text"
					/>
					<div className="flex justify-end gap-2">
						<button
							type="submit"
							className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 ease-in transition-colors"
						>
							Save
						</button>
					</div>
				</form>
			) : (
				<div className="flex flex-col gap-2">
					<p className="text-white text-xl text-center text-shadow-lg font-black animate-pulse">
						{purpose || "No purpose set. Click 'Edit' to add one."}
					</p>
					<button
						onClick={handleEditClick}
						className="self-end px-4 py-2 hover:bg-teal-500 ease-in text-gray-500 hover:text-white rounded transition-colors"
					>
						Edit
					</button>
				</div>
			)}
		</div>
	);
};

export default PurposeComponent;
