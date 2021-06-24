import React, { useEffect, useState } from 'react';
import { ToDo } from './components/ToDo';
import { uid } from 'uid';
import Swal from 'sweetalert2';
import moment from 'moment';

export const ToDoApp = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleNewTask = () => {
		setTodos([
			...todos,
			{
				id: uid(),
				task: inputValue,
				completed: false,
			},
		]);

		document.getElementById('input--value').value = '';
	};

	//Esto funciona porque cada vez que se actualizan los "todos" las dependencias de
	//useEffect, este dispara todas las acciones que estan dentro de el.
	useEffect(() => {
		const storageTodos = JSON.stringify(todos);
		localStorage.setItem('todos', storageTodos);
	}, [todos]);

	const handleCompleted = (e) => {
		//Este codigo apunta al hermano del padre del elemento target HTML :V
		const parentId = e.target.parentElement.previousSibling.id;
		todos.forEach((value) => {
			if (value.id === parentId) {
				value.completed = !value.completed;
				setTodos([...todos]);
			}
		});
	};

	const handleEdit = async (e) => {
		const parentText = e.target.parentElement.previousSibling.innerText;

		const edited = await Swal.fire({
			title: 'Edit',
			input: 'text',
			inputValue: parentText,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return 'You need to write something!';
				}
			},
		});

		if (edited.isConfirmed) {
			todos.forEach((value) => {
				if (value.task === parentText) {
					value.task = edited.value;
					setTodos([...todos]);
				}
			});
		}
	};

	const handleReset = async () => {
		const resetConfirmation = await Swal.fire({
			title: "You're about to delete everything, is it ok?",
			input: 'radio',
			inputOptions: {
				yes: 'YES',
				no: 'NO',
			},
			inputValidator: (value) => {
				if (!value) {
					return 'You need to choose something!';
				}
			},
		});

		if (resetConfirmation.value === 'yes') {
			setTodos([]);
			localStorage.clear();
		}
	};

	const handleDelete = (e) => {
		const parentId = e.target.parentElement.previousSibling.id;
		const myArr = todos.filter((value) => (value.id !== parentId ? value : null));

		setTodos([...myArr]);
	};

	return (
		<>
			<header className="main--header">
				<h1>To Do List</h1>
				<h2>{moment().format('dddd')}</h2>
				<span>{moment().format('MMM Do YY')}</span>
			</header>
			<form className="main--wrapper" id="main--form" onSubmit={handleSubmit}>
				<div className="wrapper--top">
					<h3 onClick={handleReset} className="bi bi-arrow-repeat btn btn-outline-dark">
						{' '}
						Reset
					</h3>
				</div>
				<div className="main--content">
					<ToDo
						todoValues={todos}
						handleCompleted={handleCompleted}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</div>
			</form>
			<section className="section--input">
				<input
					id="input--value"
					type="text"
					form="main--form"
					placeholder="Add New Task..."
					autoComplete="off"
					onChange={handleInputChange}
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
