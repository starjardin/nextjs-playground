import * as React from 'react';
import SimpleCarousel from '../components/SimpleCarousel';
import { Paper } from '../components';

export default function App(props) {
  return (
    <div className="row">
      <div className="medium-6 column" style={{width: "95%"}}>
        <Paper id="SimpleCarousel">
          <SimpleCarousel />
        </Paper>
        <hr />
      </div>
    </div>
  )
}
