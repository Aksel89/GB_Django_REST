import React from "react"
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import UsersList from "./components/UsersList.js";
import Header from "./components/header.js";
import Footer from "./components/footer";
import TodoList from "./components/TodoList";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import {Box, Row, Column, Container} from "./components/header.js";
import axios from "axios"


const NotFound = ({ }) => {
    return (
        <div>Page not found</div>
    )
}

class App extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
        'users': [],
        'projects': [],
        'todo': [],
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

    axios
        .get('http://127.0.0.1:8000/api/projects/')
        .then(response => {
            const projects = response.data
            this.setState({
                'projects': projects
            })
        })
        .catch(error => console.log(error))

    axios
        .get('http://127.0.0.1:8000/api/todo/')
        .then(response => {
            const todo = response.data
            this.setState({
                'todo': todo
            })
        })
        .catch(error => console.log(error))

  }

  render() {
    return (

        <div>
            <Header />
            <BrowserRouter>
                <nav>
                    <Box>
                        <Container>
                            <Row>
                                <Column>
                                    <Link to="/">Пользователи</Link>
                                </Column>
                                <Column>
                                    <Link to="/projects">Проекты</Link>
                                </Column>
                                <Column>
                                    <Link to="/todo">Список заданий</Link>
                                </Column>
                            </Row>
                        </Container>
                    </Box>
                </nav>
                <Routes>
                    <Route exact path='/' element={<UsersList users={this.state.users} /> } />
                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects} /> } />
                    <Route exact path='/todo' element={<TodoList todo={this.state.todo} /> } />
                    <Route path='/users' element={<Navigate to="/" />} />
                    <Route path='/projects/:id'   element={<ProjectDetails projects={this.state.projects} /> } />
                    <Route path="*" element={<NotFound /> } />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    )
  }
}

export default App;
