/* eslint-disable no-unused-vars */

import React from 'react';
import { BrowserRouter , Link, Route, RouterProvider, createBrowserRouter} from 'react-router-dom';
import './App.css';
import SenderPage from './SenderPage';
import ReceiverPage from './ReceiverPage';
import Applayout from './Applayout';
import Sendersteg from './sendersteg';
import Receiverwithstego from './Receiverwithstego';

const router=createBrowserRouter([{
  path:"/",
  element:<Applayout/>
},
 { path:"sender",
    //element:<SenderPage/>
    element:<Sendersteg/>
},
{
  path:"receiver",
  //element:<ReceiverPage/>
  element:<Receiverwithstego/>
}
])


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;




