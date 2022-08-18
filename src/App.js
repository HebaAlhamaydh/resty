import React, { useState, useEffect, useReducer } from 'react';

import './app.scss';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Results from './components/results/results';
import historyReducer, { addHistory, emptyHistory } from './components/history/history';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';

const initialState = {
  history: [],
}

function App() {

  const [data, setdata] = useState({});
  const [requestDiv, setrequestDiv] = useState({});
  const [state, dispatch] = useReducer(historyReducer, initialState)
  const [show, setShow] = useState(false)



  useEffect(() => {

    ///////get method//////
    if (requestDiv.method === "get") {

      axios.get(requestDiv.url)
        .then((result) => {
          let data = {
            header: result.headers,
            response: result.data,
          };

          // console.log(".,,,,,,,,,,,,,,,,",data)
          let send = {
            requestDiv: requestDiv,
            data: [data]
          };
         
          dispatch(addHistory(send))
          setdata(data);



        })
        .catch((error) => {
          console.log(error);
          setdata({ stauts: "loading..." })
        });
    }
    ///////post method//////
    if (requestDiv.method === "post") {
      console.log("post", requestDiv.body);
      axios.post(requestDiv.url, requestDiv.body)
        .then((result) => {
          console.log(result);
          const data = {
            header: result.headers,
            count: 1,
            response: result.data,
          };
          dispatch(addHistory(requestDiv))
          setdata(data);
        })
        .catch((error) => {
          console.log(error);
          setdata({ stauts: "loading..." })
        });
    }
    ///////////////////put//////////////////
    if (requestDiv.method === "put") {
      axios.put(requestDiv.url, requestDiv.body)
        .then((result) => {

          const formData = {
            header: result.headers,
            count: 1,
            data: result.data,
          }
          dispatch(addHistory(requestDiv))
          setdata(formData);
        })
        .catch((error) => {
          console.log(error);
          setdata({ stauts: "loading..." })
        });
    }
    //////////delete method////

    if (requestDiv.method === "delete") {

      axios.delete(requestDiv.url)
        .then((result) => {

          const data = {
            header: result.headers,
            count: 1,
            response: result.data,
          };
          dispatch(addHistory(requestDiv))
          setdata(data);
        })
        .catch((error) => {
          console.log(error);
          setdata({ stauts: "loading..." })
        });
    }
  }, [requestDiv]);

  const callApi = (requestParams) => {

    setrequestDiv(requestParams);
    // setdata({});
  };


  // useEffect(() => {
  //   callApi(requestDiv);
  //    // eslint-disable-next-line
  // }, [requestDiv])


  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestDiv.method}</div>
      <div>URL: {requestDiv.url}</div>
      <pre >
      <button  onClick={()=>setShow(true)}>show History</button>{'  '}
      <button  onClick={()=>setShow(false)}>Hide History</button>{'  '}
      <button  onClick={() => dispatch(emptyHistory())}>Clear History</button>
      </pre >
      {show &&
        <>
          {
            state.history.map((e, i) => {
            
              return (
 
                <section >
                  <h1 >History</h1>
                <div key={i}>
                  <p>{e.requestDiv.method}</p>
                  <p> {e.requestDiv.url}</p>
                
            
                  {e.data.map((event) => {
    
                    return (
                      // <section>{event? JSON.stringify(event) : "null"}</section>
                      <section id="history"> <JSONPretty id='json-pretty' data={event} /></section>
                      
                    )

                  })}
                </div>
                </section>
              )
            })
          }

        </> 
      }
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;