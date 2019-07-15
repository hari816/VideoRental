import React, { Component } from "react";
import Movies from "./components/movies";
import { Route } from "react-router-dom";
import NotFound from "./components/notfound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieform";
import LoginForm from "./components/loginform";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
