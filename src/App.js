import React, { Component } from 'react';
import './App.css';

import List from "./components/List"
import SearchForm from "./components/Form"

import axios from "axios"
import Header from "./components/Header"


class App extends Component {
  state = {
    users: [],
    search: "",
    usersFilter: []

  }

  componentDidMount() {

    const BASEURL = "https://randomuser.me/api/?results=200";


    axios.get(BASEURL)
      .then(db => {

        // api call
        const getusers = db.data.results
        this.setState({ users: getusers, usersFilter: getusers })
      })
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
      usersFilter: this.state.users.filter(user => (user.name.first.toLowerCase()).indexOf(this.state.search.toLowerCase()) !== -1)
    });
  };

  // search the  API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("searchterm:", this.state.search)
    this.setState({ usersFilter: this.state.users.filter(user => (user.name.first.toLowerCase()).indexOf(this.state.search.toLowerCase()) !== -1) })

    
  };

  //sort array 
  sortCity() {
    let sortedArray = this.state.users
    function compare(a, b) {
      if (a.location.city > b.location.city) {
        return -1;
      }
      if (a.location.city < b.location.city) {
        return 1;
      }
      
      return 0;
    }
    this.setState({ user: sortedArray.sort(compare) })
  }

  sortAge() {
    let sortedArray = this.state.users
    function compare(a, b) {
      if (a.dob.age > b.dob.age) {
        return -1;
      }
      if (a.dob.age < b.dob.age) {
        return 1;
      }

      return 0;
    }
    this.setState({ user: sortedArray.sort(compare) })
  }

  sortLast() {
    let sortedArray = this.state.users
    function compare(a, b) {
      if (a.name.last > b.name.last) {
        return -1;
      }
      if (a.name.last < b.name.last) {
        return 1;
      }

      return 0;
    }
    this.setState({ user: sortedArray.sort(compare) })
  }

  // render 
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <h2>or</h2>
        <button onClick={() => this.sortLast()}>Sort by Last Name</button>
        <button onClick={() => this.sortCity()}>Sort by City</button>
        <button onClick={() => this.sortAge()}>Sort by Age</button>
        <List
          users={this.state.usersFilter}
        />

      </div>
    )
  }
}

export default App;