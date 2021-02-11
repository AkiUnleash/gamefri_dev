import * as React from 'react';
import { render } from 'react-dom';
import Top from './pages/Top';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "assets/css/destyle.css"

const Main = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Top} />
            </Switch>
        </BrowserRouter>
    );
};

render(<Main />, document.getElementById('root'));

export default Main;
