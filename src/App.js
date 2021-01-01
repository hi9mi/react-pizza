import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { Cart, Home } from './pages';
import './scss/app.scss';

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<Route path='/' component={Home} exact />
			<Route path='/cart' component={Cart} exact />
		</div>
	);
}

export default App;

// class App extends React.Component {
// 	componentDidMount() {
// 		axios.get('http://localhost:3000/db.json').then(({ data }) => {
// 			this.props.setPizzas(data.pizzas);
// 		});
// 	}
// 	render() {
// 		debugger;
// 		return (
// 	<div className='wrapper'>
// 	<Header />
// 	<Route path='/' render={() => <Home pizzas={this.props.pizzaItems} />} exact />
// 	<Route path='/cart' component={Cart} exact />
// </div>

// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		pizzaItems: state.pizzas.pizzaItems,
// 	};
// };

// export default connect(mapStateToProps, { setPizzas })(App);
