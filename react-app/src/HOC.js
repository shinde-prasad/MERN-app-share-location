import React from "react";
import { Navigate } from 'react-router-dom';

const HocOfRouteAuth = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            const isAuthenticated = localStorage.getItem('isloggedin');

            if (!isAuthenticated) {
                return <Navigate to="/login" />;
            }

            return <WrappedComponent {...this.props} />
        }
    }
}
export default HocOfRouteAuth;
