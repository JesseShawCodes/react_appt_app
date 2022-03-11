import React, { useState, useEffect } from 'react';

import { Routes, Route } from "react-router-dom";
import { Home, About, Events, Contact, Whoops404, Services, CompanyHistory, Location } from "./pages"

import { BsFillAlarmFill } from 'react-icons/bs';


function App({login}) {
  console.log("App Component")
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("use effect")
    if(!login) return;
    setLoading(true)
    fetch(`https://my.api.mockaroo.com/users.json?key=10798740`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
  }, [login]);

  if(loading) {
    console.log("loading")
    return <h1>Loading...</h1>
  };
  if(error) {
    console.log("error")
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  if(!data) return null;

  if(data) {
    // console.log("data")
    return <div>
      <h1>{data[1].first_name} {data[1].last_name}</h1>
      <p>{data[1].email}</p>
      <p>{data[1].gender}</p>
      <BsFillAlarmFill />
      <p><img src={data[1].image} alt="cat"></img></p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="services" element={<Services />} />
          <Route path="history" element={<CompanyHistory />} />
          <Route path="location" element={<Location />} />
        </Route>

        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  }
}

export default App;
