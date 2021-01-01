import axios from 'axios';

export const setLoaded = (payload) => ({
	type: 'SET_LOADED',
	payload,
});

export const fetchPizzas = (sortBy, categories) => (dispatch) => {
	dispatch(setLoaded(false));
	axios
		.get(
			`http://localhost:3001/pizzas?${categories !== null ? `category=${categories}` : ''}&_sort=${sortBy.type}&_order=${
				sortBy.order
			}`,
		)
		.then(({ data }) => {
			dispatch(setPizzas(data));
		});
};

export const setPizzas = (pizzaItems) => ({
	type: 'SET_PIZZAS',
	payload: pizzaItems,
});
