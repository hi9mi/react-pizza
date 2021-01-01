export const setSortBy = ({ type, order }) => ({
	type: 'SORT_BY',
	payload: { type, order },
});

export const setCategory = (catIndex) => ({
	type: 'SET_CATEGORIES',
	payload: catIndex,
});
