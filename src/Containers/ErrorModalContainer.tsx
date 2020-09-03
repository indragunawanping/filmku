import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { State } from "../state";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateErrorModalStatus } from "../actions";
import styles from  "./ErrorModalContainer.module.css";

interface ErrorModalProps {
  dispatch: Dispatch;
  isOpen: boolean;
  title?: string;
  content?: string | JSX.Element;
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.control.errorModal.isOpen,
    title: state.control.errorModal.title,
    content: state.control.errorModal.content
  };
};

const ErrorModalContainer: React.FC<ErrorModalProps> = (props: ErrorModalProps) => {
  const handleCloseErrorModal = () => {
    props.dispatch(updateErrorModalStatus({
      title: "",
      content: "",
      isOpen: false
    }));
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={handleCloseErrorModal}
      size='small'
      className={styles.ErrorModal}
    >
      <Header icon='close' content={props.title ? props.title : "Error"} className={styles.Header}/>
      <Modal.Content>
        {props.content ? props.content : "There is an error in the current operation. Please refresh your browser and try again."}
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleCloseErrorModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};


export default connect(mapStateToProps)(ErrorModalContainer);
