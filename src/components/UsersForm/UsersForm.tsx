import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { saveLocal, usersContext } from '../../context/usersData';

export function UsersForm() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { users, setUsers } = useContext(usersContext);
  const emailRegEx = /^(\S{2,})+@(\S{2,})+\.(\S{2,})+$/;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    name.length < 2 ? setIsNameValid(false) : setIsNameValid(true)
    lastName.length < 2 ? setIsLastNameValid(false) : setIsLastNameValid(true)
    emailRegEx.test(email) ? setIsEmailValid(true) : setIsEmailValid(false)

    if (isNameValid && name && isLastNameValid && lastName && isEmailValid && email) {
      setUsers([...users, {
        id: Math.random().toString(10).slice(2),
        name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
        lastName: lastName[0].toUpperCase() + lastName.slice(1).toLowerCase(),
        email: email,
      }]);

      setName('')
      setLastName('')
      setEmail('')
    }
  }
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value.length < 2 && e.target.value.length > 0 ? setIsNameValid(false) : setIsNameValid(true)
    setName((e.target.value).trim());
  }
  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value.length < 2 && e.target.value.length > 0 ? setIsLastNameValid(false) : setIsLastNameValid(true)
    setLastName((e.target.value).trim());
  }
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    emailRegEx.test(e.target.value) || e.target.value.length === 0 ? setIsEmailValid(true) : setIsEmailValid(false)
    setEmail((e.target.value).trim());
  }

  useEffect(() => {
    saveLocal(users)
  }, [users])

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label className='input__label'>
        {!isNameValid && (
          <div className='invalid'>Введите два и более символа</div>
        )}
        <input
          value={name}
          onChange={handleChangeName}
          className='form__input'
          type='text'
          placeholder='Введите имя' />
      </label>
      <label className='input__label'>
        {!isLastNameValid && (
          <div className='invalid'>Введите два и более символа</div>
        )}
        <input
          value={lastName}
          onChange={handleChangeLastName}
          className='form__input'
          type='text'
          placeholder='Введите фамилию' />
      </label>
      <label className='input__label'>
        {!isEmailValid && (
          <div className='invalid'>Некорректный формат</div>
        )}
        <input
          value={email}
          onChange={handleChangeEmail}
          className='form__input'
          type='text'
          placeholder='Введите Email' />
      </label>
      <button className='form__btn' type='submit'>Добавить</button>
    </form>
  );
}
