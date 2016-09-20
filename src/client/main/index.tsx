import { ReactDOM, React, Router } from 'chen-react';
import routes from './routes';

ReactDOM.render(
  <Router.Router routes={routes} history={Router.browserHistory} />,
  document.getElementById('app-main')
);
