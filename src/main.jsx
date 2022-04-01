import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import GatewayModel from "src/models/gateway-model";


// import * as ReactDOMClient from 'react-dom/client';
export const gateway = new GatewayModel()

const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home"/>);

