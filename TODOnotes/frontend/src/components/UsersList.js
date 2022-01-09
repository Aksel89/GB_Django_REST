
const UserItem = ({user}) => {
    return(
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return(
    <center><table border="1" >
        <th>
            Username
        </th>
        <th>
            First name
        </th>
        <th>
            Last name
        </th>
        <th>
            email
        </th>
        {users.map((user) => <UserItem user={user} />)}
    </table></center>
    )
}

export default UsersList;