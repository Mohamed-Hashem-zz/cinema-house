import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'
import Favicon from 'react-favicon';

import img from "./images/movie.svg"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-alice-carousel/lib/alice-carousel.css';

/// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.min.js"
import "popper.js/dist/umd/popper.min.js"
import "bootstrap/dist/js/bootstrap.min.js"

//import Fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css"

import './index.css';

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>

      <Favicon url={img} />

      <App />

    </BrowserRouter>

  </React.StrictMode>,

  document.getElementById('root')
);

