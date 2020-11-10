import React, {createContext} from 'react'

export const UserContext = React.createContext();// User login context
export const OtherContext = React.createContext();
export const AppContext = React.createContext();

export const ProvideAppContext = props => {
	return (
		<UserContext.Consumer>
			{userContext => (
				<OtherContext.Consumer>
					{otherContext => (
						<AppContext.Provider value={{ userContext, otherContext }}>
							{props.children}
						</AppContext.Provider>
					)}
				</OtherContext.Consumer>
			)}
		</UserContext.Consumer>
	);
};