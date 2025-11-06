import React from 'react'
import AddProblem from './AddProblem'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div>
            <Link to={'/add-problem'}><button>Add Problem</button> </Link>
            <Link to={'/add-sheet'}><button>Add Sheet</button> </Link>
        </div>

    )
}

export default Admin