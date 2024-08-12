
// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './UI/Access/UI.css'
import './UISettings.css' 
import { BrowserRouter } from 'react-router-dom'
import 'swiper/css';
import { Provider } from 'react-redux'
// import eruda from 'eruda';

// eruda.init()
// import { store } from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     {/* <Provider store={store}> */}
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     {/* </Provider> */}
//   </React.StrictMode>,
// )
