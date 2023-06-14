import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "urql";
import "./index.css";
import { urqlClient } from "./utils/urqlClient.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={urqlClient}>
      <App />
    </Provider>
  </React.StrictMode>
);
