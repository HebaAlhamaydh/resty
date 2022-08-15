import React, { useState,useEffect } from 'react';

import './app.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Results from './components/results/results';
import axios from 'axios';

function App() {

  const [data, setdata] = useState({});
  const [requestDiv, setrequestDiv] = useState({});

  useEffect(() => {
    ///////get method//////
    if(requestDiv.method ==="get"){

    axios.get(requestDiv.url)
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
      setdata({stauts:"loading..."})
    });
  }
 ///////post method//////
 if(requestDiv.method ==="post"){
  console.log("post",requestDiv.body);
  axios.post(requestDiv.url,requestDiv.body)
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
    setdata({stauts:"loading..."})
  });
}
 ///////////////////put//////////////////
 if(requestDiv.method ==="put"){
  axios.put(requestDiv.url,requestDiv.body)
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
  setdata({stauts:"loading..."})
});
}
//////////delete method////

if(requestDiv.method ==="delete"){

  axios.delete(requestDiv.url)
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
    setdata({stauts:"loading..."})
  });
}
},[requestDiv]);
const callApi = (requestParams) => {
    
  setrequestDiv(requestParams);
  setdata({});
};


  
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