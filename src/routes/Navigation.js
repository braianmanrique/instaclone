import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import routes from "./routes";

import { map } from "lodash";
import LayoutBasic from "../layouts/LayoutBasic";

export default function Navigation(){
    return(
        <Router>
            <Routes >
                {map(routes, (route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        element={
                               <LayoutBasic>
                                        <route.element   />
                               </LayoutBasic> 
                          } // Aquí pasamos el componente como JSX
                    />
                ))}
            </Routes >
        </Router>
    )
}