import PropTypes from 'prop-types';
import React from 'react';

const Categories = React.memo(function Categories({ catItems, catOnClick, catItem }) {
	// const [catItem, setCatItem] = React.useState(null);

	// const onSelectCategory = (index) => {
	// 	catOnClick(index);
	// };

	return (
		<div className='categories'>
			<ul>
				<li className={catItem === null ? 'active' : ''} onClick={() => catOnClick(null)}>
					Все
				</li>
				{catItems &&
					catItems.map((catName, index) => (
						<li
							className={catItem === index ? 'active' : ''}
							onClick={() => catOnClick(index)}
							key={`${catName}_${index}`}>
							{catName}
						</li>
					))}
			</ul>
		</div>
	);
});
Categories.propTypes = {
	catItems: PropTypes.array,
};

export default Categories;
