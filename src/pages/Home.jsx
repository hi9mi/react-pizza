import PropTypes, { object } from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, LoadingBlock, PizzaBlock, Sortpopup } from '../components';
import { addPizzaToCart } from '../redux/actions/cart';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

export default function Home() {
	const sortNames = [
		{ name: 'популярности', type: 'popular', order: 'desc' },
		{ name: 'цене', type: 'price', order: 'desc' },
		{ name: 'алфавиту', type: 'name', order: 'asc' },
	];
	const catNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые'];
	const dispatch = useDispatch();
	const pizzaItems = useSelector(({ pizzas }) => pizzas.pizzaItems);
	const cartItems = useSelector(({ cart }) => cart.pizzaItems);
	const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
	const { sortBy, categories } = useSelector(({ filters }) => filters);

	const onSelectCategory = React.useCallback((index) => {
		dispatch(setCategory(index));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSelectSortType = React.useCallback((type) => {
		dispatch(setSortBy(type));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		dispatch(fetchPizzas(sortBy, categories));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortBy, categories]);

	const handleAddPizzaToCart = (obj) => {
		dispatch(addPizzaToCart(obj));
	};

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories catItem={categories} catOnClick={onSelectCategory} catItems={catNames} />
					<Sortpopup activeSortType={sortBy.type} sortItems={sortNames} sortOnClick={onSelectSortType} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>
					{isLoaded
						? pizzaItems.map((pizzaObj) => (
								<PizzaBlock
									onClickAddPizza={handleAddPizzaToCart}
									addedCount={cartItems[pizzaObj.id] && cartItems[pizzaObj.id].pizzaItems.length}
								
									{...pizzaObj}
									key={pizzaObj.id}
								/>
						  ))
						: Array(12)
								.fill(0)
								.map((_, index) => <LoadingBlock key={`${_}_${index}`} />)}
				</div>
			</div>
		</div>
	);
}

Home.propTypes = {
	pizzas: PropTypes.arrayOf(object),
};

Home.defaultProps = {
	pizzas: [],
};
