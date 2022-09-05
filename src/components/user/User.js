import { useRef, useState } from "react";
import Wrapper from "../helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./User.module.css";

const User = ({ addUser }) => {
    const userRef = useRef(); // reading the value directly rather than changing state on key stroke
    const ageRef = useRef();
    let [isValid, setValid] = useState(true);
    const [error, setError] = useState({
        title: "An error occured",
        message: "",
    });

    const addNewUserHandler = (e) => {
        e.preventDefault();

        let enteredUsername = userRef.current.value;
        let enteredAge = ageRef.current.value;
        if (!enteredUsername.trim() || !enteredAge.trim()) {
            setValid(() => {
                setError({
                    ...error,
                    message: "Enter valid age and name (non empty)",
                });
                return false;
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
        userRef.current.value = "";
        ageRef.current.value = "";
        // enteredUsername = "";
        // enteredAge = "";
    };

    const onCloseModalHandler = () => {
        setValid(true);
    };

    return (
        // react wrapper rather than putting div it will slow down the app since the browser will render the useless div
        <Wrapper>
            {/* as if this renders here but this is not it is rendered outside */}
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
                        <input type="text" ref={userRef} />
                        <label htmlFor="">Age</label>
                        <input type="number" ref={ageRef} />
                        <Button type="submit">Add user</Button>
                    </div>
                </form>
            </Card>
        </Wrapper>
    );
};
export default User;
