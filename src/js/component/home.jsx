import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {

	// [
	// 	{ label: "Make the bed", done: false },
	// 	{ label: "Walk the dog", done: false },
	// 	{ label: "Do the replits", done: false }
	//   ]
	

		//const [todo, setTodo] = useState();
		const [ task, setTask] = useState([])
		const [ listServer, setListServer ] = useState([])
		
	
console.log("task", task)
console.log("listServer", listServer)

		const value = (evt) => {
			if (evt.keyCode === 13){
				setTask([...task, evt.target.value]); //Add task in the app
				setListServer([...listServer, { label: evt.target.value , done: false }]) //Add an Update in the server
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
			
		}); // on Click remove todo off the app

		useEffect(() => {
			update();
		},[ listServer ])

	const update = () => {
	
		fetch('https://assets.breatheco.de/apis/fake/todos/user/gerson', {
      method: "PUT", // perform an update on the server
      body: JSON.stringify(listServer),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
	}

	const user = () => {
		fetch ('https://assets.breatheco.de/apis/fake/todos/user/gerson', {
			
			method: "POST", //Send an updade of the infor on the server  
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			  }	
		}

		)
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
		
	}

	const deleteAllTasks = () => {
		fetch ('https://assets.breatheco.de/apis/fake/todos/user/gerson', {
			
			method: "DELETE", //Erase the info off the server
			headers: {
				"Content-Type": "application/json"
			  }	
		}

		)
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
		window.location.reload();
	}


	

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todo</h1>
			<ul className="list-group">
				<li className="list-group-item"><input type="text" placeholder="Please add your task" onKeyDown={value} />{list}</li>
			</ul>
			<button type="button" className="btn btn-success" onClick={user}>Create User Gerson</button>
			<button type="button" className="btn btn-danger" onClick={deleteAllTasks}>Delete All Tasks</button>
			
		</div>
	);
};

export default Home;
