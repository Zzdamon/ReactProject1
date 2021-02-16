import React from 'react';
import './UserItem.css';

function UserItem(props) {
    const {name, email, isGoldClient,salary,image} = props;

    return (
        <div className="user-item">
            <img src={image} alt="userImage"></img>
            <h3>{ name }</h3>
            <p>{ email }</p>
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
            <p>Salary: {salary} $</p>
            <button onClick={()=>props.deleteUser(props.id)}>Delete</button>

        </div>
    );
}

export default UserItem;