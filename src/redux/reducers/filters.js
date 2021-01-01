const initialState = {
 sortBy: {
    type: 'popular',
    order: 'desc',
  },
	categories: null,
};

const filters = (state = initialState, action) => {
	switch (action.type) {
		case 'SORT_BY':
			return {
				...state,
				sortBy: action.payload,
			};
		case 'SET_CATEGORIES':
			return {
				...state,
				categories: action.payload,
			};
		default:
			return state;
	}
};

export default filters;
