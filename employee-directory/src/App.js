import React, { Component } from 'react';
import './App.css';
//  import Header from "./components/"
import List from "./components/List"
import SearchForm from "./components/Form"
import API from "./components/api"
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

    // Export an object with a "search" method that searches the RAMDOMUSER API for the passed query

    axios.get(BASEURL)
      .then(db => {

        // call the api for get the users
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

  // When the form is submitted, search the  API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("searchterm:", this.state.search)
    this.setState({ usersFilter: this.state.users.filter(user => (user.name.first.toLowerCase()).indexOf(this.state.search.toLowerCase()) !== -1) })

    // this.searchGiphy(this.state.search);
  };

  //sort array was taken from stackoverflow
  sortAge() {
    let sortedArray = this.state.users
    function compare(a, b) {
      if (a.dob.age > b.dob.age) {
        return -1;
      }
      if (a.dob.age < b.dob.age) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    this.setState({ user: sortedArray.sort(compare) })
  }

  // render will pull the information fom the components library 
  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <button onClick={() => this.sortAge()}>Sort by Age</button>
        <List
          users={this.state.usersFilter}
        />

      </div>
    )
  }
}

export default App;