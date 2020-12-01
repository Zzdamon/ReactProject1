import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
    const { users } = props;

    return (
        <div>
            <h2>Lista utilizatorilor:</h2>
            { users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    isGoldClient={ user.isGoldClient }
                    image={user.image}
                    salary={user.salary}
                    key={ index }
                />
            })}
        </div>
    );
}

export default UserList;