import React from 'react';

import AddAppointment from './components/AddAppointment';
import Search from './components/Search';
import { BiCalendar } from 'react-icons/bi';

import Appointmentinfo from './components/AppointmentInfo';

import { useState, useEffect, useCallback} from "react";

function App({login}) {


  let [appointmentList, setAppointmentList] = useState([])
  let [query, setQuery] = useState("")
  let [sortBy, setSortBy] = useState("petName")
  let [orderBy, setOrderBy] = useState("asc")

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) || 
        item.aptNotes.toLowerCase().includes(query.toLowerCase())

      )
    }
  ).sort((a,b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppointmentList(data)
    });
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

 return (
   <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3"><BiCalendar className="inline-block text-red-400 align-top" />Your Appointments</h1>
      <AddAppointment 
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
      <Search 
        query={query} 
        onQueryChange={myQuery => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={myOrder => setOrderBy(myOrder)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)}
      />

      <ul>
        {
          filteredAppointments
            .map((appointment, i) => (
              <Appointmentinfo 
                key={appointment.id}
                appointment={appointment}
                onDeleteAppointment={
                  appointmentId => 
                    setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId))
                }
              />
            ))
        }
      </ul>
   </div>
 )
}

export default App;
// import { Routes, Route } from "react-router-dom";
// import { Home, About, Events, Contact, Whoops404, Services, CompanyHistory, Location } from "./pages"

// import { BsFillAlarmFill } from 'react-icons/bs';

/*
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
      <h1 className="text-3xl font-bold underline">{data[1].first_name} {data[1].last_name}</h1>
      <p>{data[1].email}</p>
      <p>{data[1].gender}</p>
      <BsFillAlarmFill />
      <AddAppointment />
      <Search />
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
*/
