import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./custom.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./Shared/ErrorBoundary";

const queryClient = new QueryClient();

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen="true" />
          <App />
        </QueryClientProvider>
      </React.StrictMode>
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
