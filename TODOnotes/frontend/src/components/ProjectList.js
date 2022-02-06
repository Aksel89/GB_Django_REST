import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return(
        <tr>
            <td><Link to={`/projects/${project.id}/`}>{project.name} </Link></td>
            <td>{project.repo_url}</td>
            <td>{project.users }</td>
            <td><button onClick={() => deleteProject(project.id)} type="button">Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <center>
            <table border="1" >
            <th>
                Title
            </th>

            <th>
                Link to repository
            </th>

            <th>
                Users
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}

            <Link to='/project/create'>Create</Link>
            <Link to='/project/find'>Find</Link>

            </table>
        </center>
    )
}

export default ProjectList;