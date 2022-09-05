import ReactDOM from "react-dom";

import Button from "./Button";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const Backdrop = ({ onClick }) => {
    return <div className={classes.backdrop} onClick={() => onClick()} />;
};

const ModalOverlay = ({ title, message, onClick }) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{title}</h2>
            </header>
            <div className={classes.content}>
                <p>{message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={() => onClick()}>Okay</Button>
            </footer>
        </Card>
    );
};

const ErrorModal = (props) => {
    return (
        // this is using portal
        // see the index.html
        <>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onClick} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onClick={props.onClick}
                />,
                document.getElementById("overlay-root")
            )}
        </>
    );
};
export default ErrorModal;
