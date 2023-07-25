import { useContext, useEffect } from 'react';
import { saveLocal, usersContext } from '../../context/usersData';
import { UserRow } from './UserRow';

export function UsersTable() {
  const { users, setUsers } = useContext(usersContext);

  useEffect(() => {
    saveLocal(users)
  }, [users])

  return (
    <table className='table'>
      <thead className='table__row table__header'>
        <tr>
          <th className='table__cell'>Имя</th>
          <th className='table__cell'>Фамилия</th>
          <th className='table__cell'>Email</th>
          <th className='table__cell'></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            id={user.id}
            name={user.name}
            lastName={user.lastName}
            email={user.email}
            OnClick={() => setUsers(users.filter((a) => a.id !== user.id))} />
        ))}
      </tbody>
    </table>
  );
}
