import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>
);
