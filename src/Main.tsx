import * as React from 'react';
import { render } from 'react-dom';
import TodoList from './components/TodoList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Main = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={TodoList} />
            </Switch>
        </BrowserRouter>
    );
};

render(<Main />, document.getElementById('root'));

export default Main;
