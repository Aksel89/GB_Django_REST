// import React from 'react';


import {Link} from "react-router-dom";

const TodoItem = ({todo}) => {
    if (todo.is_active) {
        return (
            <tr>
                <td>{todo.note}</td>
                <td>{todo.create_date}</td>
                <td>{todo.project}</td>
                <td>{todo.user}</td>
            </tr>
        )
    }
    return ""
}


const TodoList = ({todo, deleteTodo}) => {
    return (
        <center>
            <table border="1" >
                <th>
                    Title
                < /th>
                <th>
                    Created time
                </th>
                <th>
                    Project title
                </th>
                <th>
                    User
                </th>
                {todo.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
                <Link to="/todo/create">Create</Link>
            </table>
        </center>

    )
}

export default TodoList;
