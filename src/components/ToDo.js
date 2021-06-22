import React from 'react';

export const ToDo = ({ todoValues }) => {

	console.log(todoValues);

	return (
		<>
		{
			todoValues.map(todo => {

			return <div className="content--todo" key={todo.id}>
						<p>{todo.task}</p>
						<div>
							<i className="bi bi-check2-circle btn btn-outline-primary"></i>
							<i className="bi bi-pencil btn btn-outline-dark"></i>
							<i className="bi bi-trash btn btn-outline-danger"></i>
						</div>
					</div>
			})
		}
		
		</>
	);
};
