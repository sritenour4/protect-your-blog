import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Compose from './views/Compose';
import Details from './views/Details';
import Admin from './views/Admin';

const App: React.FC<AppProps> = (props) => {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/compose">
					<Compose />
				</Route>
				<Route exact path="/details/:blogid">
					<Details />
				</Route>
				<Route exact path="/admin/:blogid">
					<Admin />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps { };

export default App;
