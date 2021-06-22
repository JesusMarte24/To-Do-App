import React, { useEffect, useState } from 'react';
import { ToDo } from './components/ToDo';
import { uid } from 'uid';

export const ToDoApp = () => {
	const inputValue = document.getElementById('input--value');
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleNewTask = () => {
		setTodos([
			...todos,
			{
				id: uid(),
				task: inputValue.value,
			},
		]);
		
	};

	//Esto funciona porque cada vez que se actualizan los "todos" las dependencias de
	//useEffect, este dispara todas las acciones que estan dentro de el.
	useEffect(() => {
		const storageTodos = JSON.stringify(todos);
	    localStorage.setItem('todos', storageTodos);
	}, [todos])

	const handleReset = () => {
		setTodos([]);
		localStorage.clear();
	};

	
	return (
		<>
			<header className="main--header">
				<h1>To Do List</h1>
				<h2>Monday</h2>
				<span>06/21/2021</span>
			</header>
			<form className="main--wrapper" id="main--form" onSubmit={handleSubmit}>
				<div className="wrapper--top">
					<h3 onClick={handleReset} className="bi bi-arrow-repeat btn btn-outline-dark">
						|Reset
					</h3>
				</div>
				<div className="main--content">
					<ToDo todoValues={todos} />
				</div>
			</form>
			<section className="section--input">
				<input
					id="input--value"
					type="text"
					form="main--form"
					placeholder="Add New Task..."
				/>
				<button
					type="submit"
					form="main--form"
					className="bi bi-clipboard-plus btn"
					onClick={handleNewTask}
				></button>
			</section>
		</>
	);
};
