const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			// token: sessionStorage.getItem('jwt-token') || null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// login
		// 	login: async (email, password) => {
		// 		const resp = await fetch(process.env.BACKEND_URL + "/private", {
		// 			method: 'POST',
		// 			headers: { 'Content-Type': 'application/json'},
		// 			body: JSON.stringify({email, password})

		// 		});
		// 		if (resp.ok){
		// 			const data = await resp.json();
		// 			sessionStorage.setItem('jwt-token', data.access_token);
		// 			setStore({ token: data,access_token});
		// 		} else {
		// 			throw new Error('login failed');
		// 		}
		// },

		// logout: () => {
		// 	sessionStorage.removeItem('jwt-token');
		// 	setStore({ token: null});
		// },
	}
};
};

export default getState;
