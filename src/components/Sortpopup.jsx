import PropTypes from 'prop-types';
import React from 'react';

const Sortpopup = React.memo(function Sortpopup({ activeSortType, sortItems, sortOnClick }) {
	const [sortVisableItem, setSortVisableItem] = React.useState(false);

	// const [sortItem, setSortItem] = React.useState(0);

	const toggleVisibleSortpopup = () => {
		setSortVisableItem(!sortVisableItem);
	};

	const onSelectSortPopup = (index) => {
		if (sortOnClick) {
			sortOnClick(index);
		}
		setSortVisableItem(false);
	};

	const sortLabel = sortItems.find((obj) => obj.type === activeSortType).name;

	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		if (!path.includes(sortRef.current)) {
			setSortVisableItem(false);
		}
	};

	const sortRef = React.useRef();

	React.useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
	}, []);

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					className={sortVisableItem ? 'rotated' : ''}
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={toggleVisibleSortpopup}>{sortLabel}</span>
			</div>
			{sortVisableItem && (
				<div className='sort__popup'>
					<ul>
						{sortItems &&
							sortItems.map((sortName, index) => (
								<li
									className={activeSortType === sortName.type ? 'active' : ''}
									onClick={() => onSelectSortPopup(sortName)}
									key={`${sortName.type}_${index}`}>
									{sortName.name}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
});

Sortpopup.propTypes = {
	sortItems: PropTypes.array,
};

export default Sortpopup;
