import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="container mt-4">
    <App />
  </div>
);

[
  {
    title: "Basic Information",
    id: "basic-info",
    fields: [
      {
        type: "text",
        label: "First Name",
        required: true,
        key: "firstName",
        min: 4,
      },
      {
        type: "text",
        label: "Last Name",
        required: true,
        key: "lastName",
        min: 2,
      },
    ],
  },
  {
    title: "Credentials",
    id: "cred-info",
    fields: [
      {
        type: "email",
        label: "Email Address",
        required: true,
        key: "email",
      },
      {
        type: "password",
        label: "Password",
        required: true,
        key: "password",
        min: 8,
      },
    ],
  },
  {
    title: "Address Information",
    id: "address-info",
    fields: [
      {
        type: "text",
        label: "State",
        required: true,
        key: "state",
        min: 2,
      },
      {
        type: "text",
        label: "City",
        required: true,
        key: "city",
        min: 2,
      },
    ],
  },
];
