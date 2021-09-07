import React from 'react';
import { themes, ThemeLayout, Container } from '@abdt/ornament';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainPage, DetailPage } from './pages';

const App = (): React.ReactElement => (
    <ThemeLayout theme={themes.base}>
        <Container>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/transaction/:id">
                        <DetailPage />
                    </Route>
                </Switch>
            </Router>
        </Container>
    </ThemeLayout>
);

export default App;
