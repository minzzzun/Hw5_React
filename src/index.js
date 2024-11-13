import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ShowList from './components/ShowList';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShowList/>
);

reportWebVitals();
