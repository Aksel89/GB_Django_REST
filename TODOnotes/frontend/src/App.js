import React from "react"
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import UsersList from "./components/UsersList.js";
// import Header from "./components/header.js";
import Footer from "./components/footer";
import TodoList from "./components/TodoList";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import LoginForm from "./components/LoginForm";
import {Box, Row, Column, Container} from "./components/header.js";
import axios from "axios"
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import Cookies from "universal-cookie";


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
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({token: token}, () => this.get_data())
    }
    is_auth() {
        return this.state.token !== ''
    }
    logout() {
        this.set_token('')
    }
    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.get_data())
    }
    get_token(username, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {
                username: username,
                password: password
            })
            .then(response => {
                this.set_token(response.data['token'])
                console.log(this.state.token)
            })
            .catch(error => alert('Wrong username or password'))
    }

    componentDidMount() {
        this.get_token_storage()
    }

    // get_headers() {
    //     let headers = {'Content-Type': 'application/json'};
    //     if (this.is_authenticated()) {
    //         headers['Authorization'] = 'Token' + this.state.token
    //     }
    //     return headers
    // }

    // get_token(login, password) {
    //     axios
    //         .post('http://127.0.0.1:8000/api-auth-token/', {'username': login, 'password': password})
    //         .then(response => {
    //             const token = response.data.token
    //                 console.log(token)
    //                 localStorage.setItem('token', token)
    //             this.setState({
    //                 'token': token
    //             }, this.get_data)
    //         })
    //         .catch(error => console.log(error))
    // }
    //
    // logout() {
    //     localStorage.setItem('token', '')
    //     this.setState({
    //         'token': ''
    //     }, this.get_data)
    // }
    //
    // componentDidMount() {
    //     let token = localStorage.getItem('token')
    //     this.setState({
    //         'token': token
    //     }, this.get_data)
    // }
    //
    // is_auth() {
    //     return !!this.state.token
    // }
    //
    get_headers() {
        if (this.is_auth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    get_data() {
        let headers = this.get_headers()
            axios
                .get('http://127.0.0.1:8000/api/users/', {headers})
                .then(response => {
                    const users = response.data
                    this.setState({
                        'users': users
                    })
                })
            .catch(error => {
                console.log(error);
                this.setState({
                    'users': []
                })
            })

    axios
        .get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data
            this.setState({
                'projects': projects
            })
        })
        .catch(error => {
                console.log(error);
                this.setState({
                    'projects': []
                })
            })

    axios
        .get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(response => {
            const todo = response.data
            this.setState({
                'todo': todo
            })
        })
        .catch(error => {
                console.log(error);
                this.setState({
                    'todo': []
                })
            })

    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios
            .delete(`https://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({todo: this.state.kanbans.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

     createTodo(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
            .then(response => {
                let add_todo = response.data
                const project = this.state.projects.filter((item) => item.id === add_todo.project)[0]
                const user = this.state.users.filter((item) => item.id === add_todo.user)[0]
                add_todo.project = project
                add_todo.user = user
                this.setState({kanbans: [...this.state.todo, add_todo]})
            }).catch(error => console.log(error))
    }

    createProject(name) {
        const headers = this.get_headers()
        const data = {name: name}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let add_project = response.data
                this.setState({projects: [...this.state.projects, add_project]})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
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
                                <Column>
                                    {this.is_auth() ? <button onClick={() => this.logout()}>Выход</button> : <button onClick='document.location="/login"'>Вход</button>}
                                </Column>
                            </Row>
                        </Container>
                    </Box>
                </nav>
                    <Routes>
                        <Route exact path='/' element={<UsersList users={this.state.users} /> } />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} /> } />
                        <Route exact path='/todo' element={<TodoList todo={this.state.todo} /> } />
                        <Route exact path='/login' element={<LoginForm get_token={(login, password) => this.get_token(login, password)} /> } />
                        <Route path='/users' element={<Navigate to="/" />} />
                        <Route path='/projects/:id'   element={<ProjectDetails projects={this.state.projects} /> } />
                        <Route exact path='/' element={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/create' element={() => <ProjectForm createProject={(name, repo_url) => this.createProject(name, repo_url)}/>}/>
                        <Route exact path='/todos/create' element={() => <TodoForm projects={this.state.projects} createTodo={(text, project, user) => this.createTodo(text, project, user)}/>}/>
                        <Route exact path='/todo' element={() => <TodoList todo={this.state.todo} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route path="*" element={<NotFound /> } />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        )
    }
}

export default App;