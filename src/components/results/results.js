import React from 'react';
import './results.scss'
import JSONPretty from 'react-json-pretty';

function Results(props) {
    return (
      <section>
      
        {/* <pre>{props.data ? prettyjson(props.data, false, 2) : null}</pre> */}
        <JSONPretty id='json-pretty' data={props.data} />
      </section>
    );
    
}

export default Results;