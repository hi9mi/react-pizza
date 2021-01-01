import classNames from 'classnames';
import Proptypes, { number } from 'prop-types';
import React from 'react';
import { Button } from '..';

export default function PizzaBlock({ name, imageUrl, types, sizes, price, id, onClickAddPizza, addedCount }) {
	const avaibleSizes = [26, 30, 40];
	const avaibleTypes = ['тонкое', 'традиционное'];

	const [avaibleSize, setAvaibleSize] = React.useState(0);
	const [avaibleType, setAvaibleType] = React.useState(types[0]);

	const onSelectSize = (index) => {
		setAvaibleSize(index);
	};
	const onSelectType = (index) => {
		setAvaibleType(index);
	};

	const onAddPizza = () => {
		const objPizza = {
			id,
			name,
			imageUrl,
			price,
			size: avaibleSizes[avaibleSize],
			type: avaibleTypes[avaibleType],
		};
		onClickAddPizza(objPizza);
	};

	return (
		<div className='pizza-block'>
			<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			<h4 className='pizza-block__title'>{name}</h4>
			<div className='pizza-block__selector'>
				<ul>
					{avaibleTypes.map((type, index) => (
						<li
							key={`${id}_${index}`}
							onClick={() => onSelectType(index)}
							className={classNames({
								active: avaibleType === index,
								disabled: !types.includes(index),
							})}>
							{type}
						</li>
					))}
				</ul>
				<ul>
					{avaibleSizes.map((size, index) => (
						<li
							key={`${id}_${index}`}
							onClick={() => onSelectSize(index)}
							className={classNames({
								active: avaibleSize === index,
								disabled: !sizes.includes(size),
							})}>
							{size} см.
						</li>
					))}
				</ul>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				<Button onClick={onAddPizza} className='button--add' outline>
					<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						/>
					</svg>
					<span>Добавить</span>
					{addedCount && <i>{addedCount}</i>}
				</Button>
			</div>
		</div>
	);
}

PizzaBlock.propTypes = {
	name: Proptypes.string,
	imageUrl: Proptypes.string,
	types: Proptypes.arrayOf(number),
	sizes: Proptypes.arrayOf(number),
	price: Proptypes.number,
	onClickAddPizza: Proptypes.func,
	addedCount: Proptypes.number,
};
PizzaBlock.defaultProps = {
	name: 'Pizza name',
	price: 0,
	types: [],
	sizes: [],
};
