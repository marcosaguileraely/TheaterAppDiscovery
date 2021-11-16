import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Detail from "./Detail";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/detail/:id" element={<Detail />} />
        </Routes>
    </BrowserRouter>
    ,
    document.getElementById("root")
);
