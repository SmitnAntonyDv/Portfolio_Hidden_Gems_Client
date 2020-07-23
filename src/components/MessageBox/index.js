import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import { clearMessage } from "../../store/appState/actions";

export default function MessageBox() {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <Alert
      show={showMessage}
      variant={message.variant}
      dismissible={message.dismissable}
      onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
    >
      {message.text}
    </Alert>
  );
}
