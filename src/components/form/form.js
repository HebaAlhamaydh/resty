import React, { useState } from 'react';

import './form.scss';

function Form (props){
const [method,setMethod]=useState("get");
const [url,seturl]=useState("https://pokeapi.co/api/v2/pokemon");
const [body,setbody]=useState("");

const  handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method:method,
      url: url,
      body:body,

    };
    props.handleApiCall(formData);
  }

  const urlHandler = () => {
    const link=document.getElementById('url').value;
    seturl(link);
  }

 const bodyHandler=()=>{
  const text=document.getElementById('body').value;
  setbody(text);
 }
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' id="url" onInput={urlHandler} />
            <button type="submit">GO!</button>
          </label>
          <label className="methods">
            <span id="get"    onClick={()=>{setMethod("get");}}>GET</span>
            <span id="post"   onClick={()=>{setMethod("post");}}>POST</span>
            <span id="put"    onClick={()=>{setMethod("put");}}>PUT</span>
            <span id="delete" onClick={()=>{setMethod("delete");}}>DELETE</span>
          </label>
          <textarea id="body" name="results" rows="5" cols="40" onInput={bodyHandler}></textarea>
          
        </form>
      </>
    );
  
}

export default Form;