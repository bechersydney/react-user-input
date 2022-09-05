import { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./User.module.css";

const User = ({ addUser }) => {
    let [enteredUsername, setUsername] = useState("");
    let [enteredAge, setAge] = useState("");
    let [isValid, setValid] = useState(true);
    const [error, setError] = useState({
        title: "An error occured",
        message: "",
    });

    const addNewUserHandler = (e) => {
        e.preventDefault();
        if (!enteredUsername.trim() || !enteredAge.trim()) {
            setValid(() => {
                setError({
                    ...error,
                    message: "Enter valid age and name (non empty)",
                });
            });

            return;
        }
        if (+enteredAge < 1) {
            setValid(() => {
                setError({
                    ...error,
                    message: "Enter valid age greater than 0",
                });
                return false;
            });
            return;
        } // adding + from the start convert the string to number

        addUser({
            id: Math.random(),
            name: enteredUsername,
            age: enteredAge,
        });
        setUsername("");
        setAge("");
    };
    const usernameHandler = (e) => {
        const value = e.target.value;
        setUsername(value);
    };
    const ageFormHandler = (e) => {
        const value = e.target.value;
        setAge(value);
    };

    const onCloseModalHandler = () => {
        setValid(true);
    };

    return (
        <div>
            {!isValid && (
                <ErrorModal
                    message={error.message}
                    title={error.title}
                    onClick={onCloseModalHandler}
                />
            )}
            <Card className={classes.input}>
                <form onSubmit={addNewUserHandler}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            value={enteredUsername}
                            onChange={usernameHandler}
                        />
                        <label htmlFor="">Age</label>
                        <input
                            type="number"
                            value={enteredAge}
                            onChange={ageFormHandler}
                        />
                        <Button type="submit">Add user</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
export default User;
