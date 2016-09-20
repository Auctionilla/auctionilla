import { React, Router } from 'chen-react';
import { AppComponent } from './app';
import { HomeComponent } from './components/home';

export default (
  <Router.Route component={AppComponent}>
    {/* Put your routes below this line */}
    <Router.Route path="/" component={HomeComponent} />
  </Router.Route>
);
