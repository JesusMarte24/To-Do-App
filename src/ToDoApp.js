import React from 'react';

export const ToDoApp = () => {
	return (
		<>
			<header className="main--header">
				<h1>My Day</h1>
				<h2>Monday</h2>
			</header>
			<main className="main--wrapper">
				<div className="wrapper--top">
					<i className="bi bi-arrow-counterclockwise"></i>
					<h3>Reset</h3>
				</div>
				<div className="main--content"></div>
			</main>
		</>
	);
};
