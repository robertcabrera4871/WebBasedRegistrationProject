import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Homepage from './components/Homepage';
import reportWebVitals from './reportWebVitals';

// var element = React.createElement('h1', {className: 'greeting'}, 'Hello World!');
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

var element2 = <Homepage />;
ReactDOM.render(element2, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
