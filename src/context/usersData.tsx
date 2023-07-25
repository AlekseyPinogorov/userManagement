import React, { useMemo, useState } from "react";

export type IUserData = {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

type UsersContextType = {
  users: IUserData[];
  setUsers: (users: IUserData[]) => void;
}

export const usersContext = React.createContext<UsersContextType>({
  users: [],
  setUsers: () => { }
})

export const saveLocal = (arr: IUserData[]) => {
  localStorage.setItem("users", JSON.stringify(arr));
}

export function UsersContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<IUserData[]>([]);

  useMemo(() => {
    const usersInLocal = localStorage.getItem("users");
    if (usersInLocal) {
      setUsers(JSON.parse(usersInLocal))
    } else {
      setUsers([{
        id: Math.random().toString(10).slice(2),
        name: 'Олег',
        lastName: 'Мостин',
        email: 'exemple@ex.ru'
      }, {
        id: Math.random().toString(10).slice(2),
        name: 'Виктор',
        lastName: 'Ильин',
        email: 'exemple@ex.ru'
      }, {
        id: Math.random().toString(10).slice(2),
        name: 'Ирина',
        lastName: 'Ткач',
        email: 'exemple@ex.ru'
      }])
    }
  }, [])

  return (
    <usersContext.Provider value={{
      users: users,
      setUsers: setUsers
    }}>
      {children}
    </usersContext.Provider>
  )
}

