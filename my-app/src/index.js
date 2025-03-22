import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider> {/* Wrap your app with ChakraProvider */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
