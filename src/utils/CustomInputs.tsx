import React from "react";
import { Controller } from "react-hook-form";
import { ChevronUpDownIcon, CalendarIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

interface CustomInputProps {
	label: string;
	name: string;
	control: any;
	rules: any;
	type: string;
	min?: string;
	max?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
	label,
	name,
	control,
	rules,
	type,
	min,
	max,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<div className="flex flex-col gap-2">
					<label className="font-semibold">{label}</label>
					<div className="relative">
						<input
							{...field}
							type={type}
							min={min}
							max={max}
							className="w-full bg-black bg-opacity-40 p-2 rounded transition-all duration-150 ease-in-out focus:outline-none"
						/>
						{type === "date" && (
							<CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
						)}
					</div>
					{error && <p className="text-red-500 text-sm">{error.message}</p>}
				</div>
			)}
		/>
	);
};

interface DropdownOption {
	value: string;
	label: string;
}

interface CustomDropdownProps {
	options: DropdownOption[];
	value: string;
	onChange: (value: string) => void;
	label: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
	options,
	value,
	onChange,
	label,
}) => {
	return (
		<Listbox
			value={value}
			onChange={onChange}
		>
			<div className="relative flex flex-col gap-2 text-base">
				<Listbox.Label className="font-semibold">{label}</Listbox.Label>
				<div className="relative">
					<Listbox.Button className="relative w-full cursor-default rounded-lg bg-black bg-opacity-40 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
						<span className="block truncate">
							{options.find((option) => option.value === value)?.label || value}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-black bg-opacity-90 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{options.map((option, optionIdx) => (
								<Listbox.Option
									key={optionIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active ? "bg-teal-600 text-white" : "text-gray-300"
										}`
									}
									value={option.value}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected ? "font-medium" : "font-normal"
												}`}
											>
												{option.label}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
													<CheckIcon
														className="h-5 w-5"
														aria-hidden="true"
													/>
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</div>
		</Listbox>
	);
};
