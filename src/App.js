import './App.css';
import Nav from "./component/common/nav.js";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Nav/>

            <Router>
                <div>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/things">
                            <h1>Things</h1>
                        </Route>
                        <Route exact path="/settings">
                            <h1>Settings</h1>
                        </Route>
                        <Route exact path="/users">
                            <h1>users</h1>
                        </Route>
                    </Switch>
                </div>
            </Router>

        </div>
    );
}

export default App;
