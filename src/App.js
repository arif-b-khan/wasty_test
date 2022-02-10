import './App.css';
import Header from './Shared/Header';
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./Shared/NotFound";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Todos from './Components/Todos';

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <Breadcrumb />
                <div className="text-center mt-5">
                    <Switch>
                        <Route exact path="/"><Redirect to="/todos" /></Route>
                        <Route path="/todos"><Todos /></Route>
                        <Route><NotFound /></Route>
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default App;
