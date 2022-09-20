import React, { useState } from "react";


//create your first component
const Home = () => {

		//const [todo, setTodo] = useState();
		const [ task, setTask] = useState([])
	


		const value = (evt) => {
			if (evt.keyCode === 13){
				setTask([...task, evt.target.value]);
				evt.target.value="";
			}

	};	
	console.log(value)
		const removeTodo = (index) => () => {
			setTask ((item) => (item.filter((_,item) => item !== index)));
		}
		const list = task.map((item, index) => {
			return (
				<li key={index} onClick={removeTodo(index)}>{item}</li>
			 )
			
		});


	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todo</h1>
			<ul className="list-group">
				<li className="list-group-item"><input type="text" placeholder="Please add your task" onKeyDown={value} />{list}</li>
			</ul>
		</div>
	);
};

export default Home;
