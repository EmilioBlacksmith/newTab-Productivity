import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Task } from "../../types/Tasks.types";

const ToDoComponent = () => {
	const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [isInputVisible, setIsInputVisible] = useState(false);
	const [editTaskId, setEditTaskId] = useState<number | null>(null);
	const [editTaskTitle, setEditTaskTitle] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const isTaskFromYesterday = (dateCreated: Date) => {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		return (
			dateCreated.getDate() === yesterday.getDate() &&
			dateCreated.getMonth() === yesterday.getMonth() &&
			dateCreated.getFullYear() === yesterday.getFullYear()
		);
	};

	useEffect(() => {
		const updatedTasks = tasks.filter(
			(task) =>
				!(
					task.status === "done" &&
					isTaskFromYesterday(new Date(task.dateCreated))
				)
		);

		if (updatedTasks.length !== tasks.length) {
			setTasks(updatedTasks);
		}
	}, []);

	const createTask = (title: string) => {
		const newTask: Task = {
			id: Date.now(),
			title,
			status: "pending",
			dateCreated: new Date(),
		};
		setTasks([...tasks, newTask]);
		setNewTaskTitle("");
	};

	const handleAddTask = () => {
		if (newTaskTitle.trim()) {
			createTask(newTaskTitle);
			setNewTaskTitle("");
		}
	};

	const handleToggleStatus = (id: number) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id
				? {
						...task,
						status: task.status === "pending" ? "done" : "pending",
				  }
				: task
		);
		setTasks(updatedTasks);
	};

	const handleRemoveTask = (id: number) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	};

	const handleEditTask = (id: number) => {
		const taskToEdit = tasks.find((task) => task.id === id);
		if (taskToEdit) {
			setEditTaskId(id);
			setEditTaskTitle(taskToEdit.title);
			setIsInputVisible(true);
		}
	};

	const handleSaveEdit = () => {
		if (editTaskTitle.trim()) {
			const updatedTasks = tasks.map((task) =>
				task.id === editTaskId ? { ...task, title: editTaskTitle } : task
			);
			setTasks(updatedTasks);
			setEditTaskId(null);
			setEditTaskTitle("");
			setIsInputVisible(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsInputVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="py-4 px-6 flex flex-col align-middle justify-center gap-4 bg-black bg-opacity-75 w-1/3 text-base rounded-lg backdrop-blur">
			<h1 className="font-bold text-2xl">Fucking Work. (To-Do list)</h1>
			<ul className="flex flex-col gap-4">
				{tasks.map((task) => (
					<li
						key={task.id}
						onClick={() => handleToggleStatus(task.id)}
						className={`flex justify-between items-center hover:cursor-pointer ${
							task.status === "done"
								? "line-through text-gray-400"
								: "font-black"
						}`}
					>
						<div>
							<span>{task.title}</span>
							<span> ({task.status})</span>
						</div>
						<div className="flex gap-4">
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveTask(task.id);
								}}
								className="w-4 h-4 text-gray-600 hover:text-red-600"
							>
								X
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleEditTask(task.id);
								}}
								className="w-4 h-4 text-gray-600 hover:text-teal-600"
							>
								E
							</button>
						</div>
					</li>
				))}
			</ul>
			{isInputVisible && editTaskId !== null ? (
				<div className="flex flex-row py-4 px-6">
					<input
						ref={inputRef}
						type="text"
						value={editTaskTitle}
						onChange={(e) => setEditTaskTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSaveEdit();
							}
						}}
						placeholder="Edit task title"
						autoFocus
						className="w-3/4 bg-transparent outline-none"
					/>
					<button
						ref={buttonRef}
						onClick={handleSaveEdit}
						className="w-1/4"
					>
						Save
					</button>
				</div>
			) : isInputVisible ? (
				<div className="flex flex-row">
					<input
						ref={inputRef}
						type="text"
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleAddTask();
							}
						}}
						placeholder="Add a new task"
						autoFocus
						className="w-3/4 bg-transparent outline-none"
					/>
					<button
						ref={buttonRef}
						onClick={handleAddTask}
						className="w-1/4 hover:bg-teal-500 text-white font-bold py-4 px-6 rounded transition-all duration-300 ease-in-out"
					>
						Add Task
					</button>
				</div>
			) : (
				<button
					onClick={() => setIsInputVisible(true)}
					className="hover:bg-teal-500 text-white font-bold py-4 px-6 rounded transition-all duration-300 ease-in-out"
				>
					Add New Task
				</button>
			)}
			<p className="text-sm font-semibold text-gray-500">
				*** This list gets automatically deleted if the task is done and was
				from yesterday
			</p>
		</div>
	);
};

export default ToDoComponent;
