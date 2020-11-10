import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import User from './pages/User';

function AppMenu(props) {
	return (
		<div className='app-container'>
			<div className='route-wrapper'>
				<Switch>
					<Route path='/'>
						<User />
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default withRouter(AppMenu);
