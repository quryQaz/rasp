import React, { PureComponent, Suspense } from "react";
import {Route, Routes} from 'react-router';
import {Paths} from "./Paths";

import {Dashboard} from "GUI/Components/Dashboard"

export default class RoutesDashboard extends PureComponent {
    render() {
        console.log( Paths.dashboard.mask());
        return (
            <Routes>
                <Route path={ Paths.dashboard.mask() } element={ <Dashboard/> } />
            </Routes>
        )
    }
}
