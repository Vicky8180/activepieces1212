// import { StrictMode } from 'react';
// import * as ReactDOM from 'react-dom/client';

// import './i18n';
// import App from './app/app';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// );
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './i18n';
import App from './app/app';

// Check if rendering inside a standalone app
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
    <App />
   
  </StrictMode>
  );
}

// Export App for Module Federation
export default App;
