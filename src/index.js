import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/Providers/AuthProvider";
import Main from "./components/Layout/Main";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Book from "./components/Book/Book";

/*<Router>
            <Header />
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/book/:bedType">
                    <PrivateRoute>
                        <Book />
                    </PrivateRoute>
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>*/

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/book",
                element: (
                    <PrivateRoute>
                        <Book></Book>
                    </PrivateRoute>
                ),
            },
            {
                path: "/book/:bedType",
                element: (
                    <PrivateRoute>
                        <Book></Book>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
