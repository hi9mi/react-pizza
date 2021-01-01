import classNames from 'classnames';
import React from 'react';

export default function Button({ children, buttonCart, outline, className, onClick }) {
	return (
		<button
			onClick={onClick}
			className={classNames('button', className, {
				'button--cart': buttonCart,
				'button--outline': outline,
			})}>
			{children}
		</button>
	);
}
