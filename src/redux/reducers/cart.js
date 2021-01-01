const initialState = {
	pizzaItems: {},
	totalPrice: 0,
	totalCount: 0,
};

const cart = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_PIZZA_CART': {
			const newPizzaItems = {
				...state.pizzaItems,
				[action.payload.id]: !state.pizzaItems[action.payload.id]
					? [action.payload]
					: [...state.pizzaItems[action.payload.id], action.payload],
			};
			const allPizzas = [].concat.apply([], Object.values(newPizzaItems));
			const totalPrice = allPizzas.reduce((sum, obj) => obj.price + sum, 0);

			return {
				...state,
				pizzaItems: newPizzaItems,
				totalCount: allPizzas.lenght,
				totalPrice,
			};
		}

		default:
			return state;
	}
};

export default cart;
