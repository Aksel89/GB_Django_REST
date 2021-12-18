import React from "react"
import UsersList from "./components/UsersList.js";
import Header from "./components/header.js";
import Footer from "./components/footer";
import axios from "axios"


class App extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {

    axios
        .get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data
            this.setState({
                'users': users
            })
        })
        .catch(error => console.log(error))

  }

  render() {
    return (

        <div>
            <Header />
            <UsersList users={this.state.users} />
            <Footer />
        </div>
    )
  }
}

export default App;
