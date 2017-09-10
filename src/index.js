import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.css';

import { component as Containers } from './containers';
import { component as Metronome } from './containers/Metronome';

import { debug } from './utils';
import reducers from './reducers';

const enhancer = () => {
  if (process.env.DEBUG && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return (compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      )
    );
  }
  return (compose(
      applyMiddleware(thunk),
    )
  );
};

const store = createStore(reducers, {}, enhancer());
const root = document.getElementById('root');

// debug(createBrowserHistory);
render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={Containers} />
    </Router>
  </Provider>,
  root
);

// import Score from './models/Score';
// var s = new Score({
//   bpm: 800,
//   bars: {
//     0: [
//       { note: 'G3', duration: 1, beat: 1 },
//       { note: 'B3', duration: 1, beat: 1 },
//       { note: 'E3', duration: 1, beat: 2 },
//       { note: 'G3', duration: 1, beat: 2 },
//       { note: 'E3', duration: 1, beat: 3 },
//       { note: 'G3', duration: 1, beat: 3 },
//     ],
//     1: [
//       { note: 'F3', duration: 1, beat: 1 },
//       { note: 'A3', duration: 1, beat: 1 },
//       { note: 'D3', duration: 1, beat: 2 },
//       { note: 'F3', duration: 1, beat: 2 },
//       { note: 'D3', duration: 1, beat: 3 },
//       { note: 'F3', duration: 1, beat: 3 },
//     ],
//     2: [
//       { note: 'C3', duration: 1, beat: 1 },
//       { note: 'E3', duration: 1, beat: 1 },
//       { note: 'D3', duration: 1, beat: 2 },
//       { note: 'F3', duration: 1, beat: 2 },
//       { note: 'E3', duration: 1, beat: 3 },
//       { note: 'G3', duration: 1, beat: 3 },
//       { note: 'F3', duration: 1, beat: 4 },
//       { note: 'A3', duration: 1, beat: 4 },
//     ],
//     3: [
//       { note: 'G3', duration: 1, beat: 1 },
//       { note: 'G3', duration: 1, beat: 2 },
//       { note: 'G3', duration: 1, beat: 3 }
//     ],
//   }
// })
// s.play();
