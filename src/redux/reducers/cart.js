// const initialState = {
// 	pizzaItems: {},
// 	totalPrice: 0,
// 	totalCount: 0,
// };

// const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

// const cart = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'ADD_PIZZA_CART': {
// 			const currentPizzaItems = !state.pizzaItems[action.payload.id]
// 				? [action.payload]
// 				: [...state.pizzaItems[action.payload.id].pizzaItems, action.payload];

// 			const newPizzaItems = {
// 				...state.pizzaItems,
// 				[action.payload.id]: {
// 					pizzaItems: currentPizzaItems,
// 					totalPrice: getTotalPrice(currentPizzaItems),
// 				},
// 			};
// 			const items = Object.values(newPizzaItems).map((obj) => obj.items);
// 			const allPizzas = [].concat.apply([], items);
// 			const totalPrice = getTotalPrice(allPizzas);

// 			return {
// 				...state,
// 				pizzaItems: newPizzaItems,
// 				totalCount: allPizzas.length,
// 				totalPrice,
// 			};
// 		}

// 		default:
// 			return state;
// 	}
// };

// export default cart;

const initialState = {
	pizzaItems: {},
	totalPrice: 0,
	totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
	const [firstKey, ...keys] = path.split('.');
	return keys.reduce((val, key) => {
		return val[key];
	}, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
	return Object.values(obj).reduce((sum, obj) => {
		const value = _get(obj, path);
		return sum + value;
	}, 0);
};

const cart = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_PIZZA_CART': {
			const currentPizzaItems = !state.pizzaItems[action.payload.id]
				? [action.payload]
				: [...state.pizzaItems[action.payload.id].pizzaItems, action.payload];

			const newItems = {
				...state.pizzaItems,
				[action.payload.id]: {
					pizzaItems: currentPizzaItems,
					totalPrice: getTotalPrice(currentPizzaItems),
				},
			};

			const totalCount = getTotalSum(newItems, 'pizzaItems.length');
			const totalPrice = getTotalSum(newItems, 'totalPrice');

			return {
				...state,
				pizzaItems: newItems,
				totalCount,
				totalPrice,
			};
		}

		case 'REMOVE_CART_ITEM': {
			const newItems = {
				...state.pizzaItems,
			};
			const currentTotalPrice = newItems[action.payload].totalPrice;
			const currentTotalCount = newItems[action.payload].pizzaItems.length;
			delete newItems[action.payload];
			return {
				...state,
				pizzaItems: newItems,
				totalPrice: state.totalPrice - currentTotalPrice,
				totalCount: state.totalCount - currentTotalCount,
			};
		}

		case 'PLUS_CART_ITEM': {
			const newObjItems = [
				...state.pizzaItems[action.payload].pizzaItems,
				state.pizzaItems[action.payload].pizzaItems[0],
			];
			const newItems = {
				...state.pizzaItems,
				[action.payload]: {
					pizzaItems: newObjItems,
					totalPrice: getTotalPrice(newObjItems),
				},
			};

			const totalCount = getTotalSum(newItems, 'pizzaItems.length');
			const totalPrice = getTotalSum(newItems, 'totalPrice');

			return {
				...state,
				pizzaItems: newItems,
				totalCount,
				totalPrice,
			};
		}

		case 'MINUS_CART_ITEM': {
			const oldItems = state.pizzaItems[action.payload].pizzaItems;
			const newObjItems = oldItems.length > 1 ? state.pizzaItems[action.payload].pizzaItems.slice(1) : oldItems;
			const newItems = {
				...state.pizzaItems,
				[action.payload]: {
					pizzaItems: newObjItems,
					totalPrice: getTotalPrice(newObjItems),
				},
			};

			const totalCount = getTotalSum(newItems, 'pizzaItems.length');
			const totalPrice = getTotalSum(newItems, 'totalPrice');

			return {
				...state,
				pizzaItems: newItems,
				totalCount,
				totalPrice,
			};
		}

		case 'CLEAR_CART':
			return { totalPrice: 0, totalCount: 0, pizzaItems: {} };

		default:
			return state;
	}
};

export default cart;
