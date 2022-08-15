import React, { useState } from 'react';

import './app.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Results from './components/results/results';
import axios from 'axios';

function App() {

  const [data, setdata] = useState({});
  const [requestDiv, setrequestDiv] = useState({});

  const callApi = (requestParams) => {
    
    ///////get method//////
    if(requestParams.method ==="get"){

    axios.get(requestParams.url)
    .then((result) => {
    const data = {
      header:result.headers,
      count:result.data.length ,
      response:result.data,
    };
    setdata(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
 ///////post method//////
 if(requestParams.method ==="post"){
  console.log("post",requestParams.body);
  axios.post(requestParams.url,requestParams.body)
  .then((result) => {
console.log(result);
  const data = {
    header:result.headers,
    count:1,
    response:result.data,
  };
  setdata(data);
  })
  .catch((error) => {
    console.log(error);
  });
}
 ///////////////////put//////////////////
 if(requestParams.method ==="put"){
  axios.put(requestParams.url,requestParams.body)
  .then((result)=>{

  const formData = {
    header:result.headers,
    count:1 ,
    data:result.data,
  }
  
  setdata(formData);
})
.catch((error) => {
  console.log(error);
});
}
//////////delete method////

if(requestParams.method ==="delete"){

  axios.delete(requestParams.url)
  .then((result) => {

  const data = {
    header:result.headers,
    count:1,
    response:result.data,
  };
  setdata(data);
  })
  .catch((error) => {
    console.log(error);
  });
}
setrequestDiv(requestParams);

  }
  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestDiv.method}</div>
      <div>URL: {requestDiv.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;