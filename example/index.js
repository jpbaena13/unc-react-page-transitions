/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import { PageTransitions, Page } from '../src';

const loadedPageTriggers = [
  /* eslint-disable no-console */
  { f: () => { console.log('loaded'); }, r: true }
  /* eslint-enable no-console */
];

const leavedPageTriggers = [
  /* eslint-disable no-console */
  { f: () => { console.log('leaved'); }, r: true }
  /* eslint-enable no-console */
];

class App extends React.Component {
  render() {
    return (
      <div id="wrapper-app">
        <button onClick={() => { this.pt.nextPage(); }} style={{ position: 'absolute', zIndex: 10 }}>Next</button>

        <PageTransitions ref={ (pt) => { this.pt = pt; } }>
          <Page style={{ backgroundColor: '#f68dbb' }}>
            <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
          </Page>

          <Page style={{ backgroundColor: '#0ac2d2' }}
                loadedPageTriggers={loadedPageTriggers}
                leavedPageTriggers={leavedPageTriggers}>
            <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
          </Page>

          <Page style={{ backgroundColor: '#7bb7fa' }}>
            <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
          </Page>
        </PageTransitions>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);
