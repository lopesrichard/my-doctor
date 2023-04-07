import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

import 'antd/dist/reset.css';
import 'leaflet/dist/leaflet.css';

import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
dayjs.locale('pt-br');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
