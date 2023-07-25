import React from 'react';
import { IUserData } from '../../../context/usersData';

type IUser = IUserData & {
  OnClick: () => void
}

export function UserRow({ id, name, lastName, email, OnClick }: IUser) {
  return (
    <tr key={id} className='table__row'>
      <td className='table__cell'>{name}</td>
      <td className='table__cell'>{lastName}</td>
      <td className='table__cell'>{email}</td>
      <td className='table__cell'>
        <button onClick={OnClick} className='table__btn form__btn'>X</button>
      </td>
    </tr>
  )
}