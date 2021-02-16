import React from 'react';
import UserItem from './UserItem';
import './UserList.css';


function UserList(props) {
    const { users,deleteUser } = props;

    return (
        <div className="user-list">
            <h2>Lista utilizatorilor:</h2>
            <div className="users">
            { users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    isGoldClient={ user.isGoldClient }
                    image={user.image}
                    salary={user.salary}
                    key={ index }
                    deleteUser={deleteUser}
                />
            })}
        </div>
        </div>
    );
}

export default UserList;