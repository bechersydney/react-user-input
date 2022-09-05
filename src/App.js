import React, { useState } from "react";
import User from "./components/user/User";
import UserList from "./components/user/UserList";

function App() {
    const [users, setUsers] = useState([]);
    const addUser = (user) => {
        setUsers((prevState) => [user, ...prevState]);
    };
    return (
        //react fragments
        <>
            <User addUser={addUser} />
            <UserList users={users} />
        </>
    );
}

export default App;
