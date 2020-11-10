
import React from 'react';
import AppMenu from './AppMenu';
import { HashRouter as Router } from 'react-router-dom';
import { UserContext, OtherContext, ProvideAppContext } from './Contexts';

function App (props) {
	return (
		<UserContext.Provider value={{ me: props.me }}>
			<OtherContext.Provider>
				<ProvideAppContext>
					<Router>
						<AppMenu me={props.me} />
					</Router>
				</ProvideAppContext >
			</OtherContext.Provider >
		</UserContext.Provider >
	);
}


let hoc = WrappedComponent => {
	return class EnhancedComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				me: null
			};
		}

		render () {

			return <WrappedComponent
        me={this.state.me}
			/>
		}
	}
}

export default hoc(App);
