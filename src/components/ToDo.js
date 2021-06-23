import React from 'react';

export const ToDo = ({ todoValues, handleCompleted, handleEdit, handleDelete }) => {

	return (
		<>
		{
			todoValues.map(todo => {

			return <div className={`content--todo animate__animated animate__lightSpeedInLeft`} key={todo.id}>
						<p className={todo.completed ? "completed": "not--completed"}>{todo.task}</p>
						<div>
							<i className="bi bi-check2-circle btn btn-outline-primary" onClick={handleCompleted}></i>
							<i className="bi bi-pencil btn btn-outline-dark" onClick={handleEdit}></i>
							<i className="bi bi-trash btn btn-outline-danger" onClick={handleDelete}></i>
						</div>
					</div>
			})
		}
		
		</>
	);
};
