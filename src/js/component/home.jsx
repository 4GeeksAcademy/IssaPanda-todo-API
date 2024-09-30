import React from "react";
import { useState } from "react";

//create your first component
function Home() {
	const [input, setInput] = useState('');
	const [chores, setChores] = useState([]);


	const getTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/BradleyAikins')
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(responseAsJson => {
        console.log(responseAsJson);

		setChores(responseAsJson.todos)
    })
    .catch(error => {
        console.log('Looks like there was a problem: \n', error);
    });

	}

	React.useEffect(() => {getTodos()}, []);

	const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setChores([...chores, [input]]);
            setInput('');
        }
    };

	const handleDelete = (indexToDelete) => {
        setChores(chores.filter((_, index) => index !== indexToDelete));
		
    };
	

	return (
		<div className="text-center">
			<input type="text"
				onChange={event => setInput(event.target.value)}
				value={input}
				onKeyDown={handleKeyDown} />
			<ul>
				{chores.map((chore, index) => (
					<li key={index}>
						{chore.label}
						<button onClick={() => handleDelete(index.id)}>X</button>
						</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
