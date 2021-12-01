import { Route, Redirect } from "react-router"
import React from "react";

export default function ProtectedRoute({component: Component, allowed, ...routeProps}){

    return(
        <Route
        {...routeProps}
        render={(props) =>
        allowed ? <Component {...props} /> : <Redirect to="/home" />
        }
        />
    );
}

