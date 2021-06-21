import React from 'react';
import { ToDo } from './components/ToDo';

export const ToDoApp = () => {
	return (
		<>
			<header className="main--header">
				<h1>My Day</h1>
				<h2>Monday</h2>
			</header>
			<form className="main--wrapper" id="main--form">
				<div className="wrapper--top">
					<h3 className="bi bi-arrow-repeat btn btn-outline-dark"> Reset</h3>
				</div>
				<div className="main--content">
					<ToDo />
				</div>
			</form>
			<section className="section--input">
				<input type="text" form="main--form" placeholder="Add New Task..." />
				<button
					type="submit"
					form="main--form"
					className="bi bi-clipboard-plus btn"
				></button>
			</section>
		</>
	);
};
