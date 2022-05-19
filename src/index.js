import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css//bootstrap.min.css"
import ReCAPTCHA from "react-google-recaptcha";
// console.log (process.env)
const recaptchaRef = React.createRef();

// const onSubmit = () => {
//   const recaptchaValue = recaptchaRef.current.getValue();
//   this.props.onSubmit(recaptchaValue);
// }
function onChange(value) {
  console.log("Captcha value:", value);
}

ReactDOM.render(
  // <ReCAPTCHA
  //   sitekey=process.env.REACT_APP_RECAPTCHA
  //   onChange={onChange}
  // />,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
