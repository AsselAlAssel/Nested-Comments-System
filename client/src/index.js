import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider >
    </BrowserRouter>
  </React.StrictMode>
);

