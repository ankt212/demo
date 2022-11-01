import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, dataDeleteUser, handleDeleteUserFromModal } =
    props;

  const handleConfirmDelete = async () => {
    let res = await deleteUser(dataDeleteUser.id);
    console.log(res);
    if (res && +res.statusCode === 204) {
      toast.success("Delete user succeed");
      handleClose();
      handleDeleteUserFromModal(dataDeleteUser);
    } else {
      toast.error("An error");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Do you want delete this user,
            <h5>
              Email = "
              {dataDeleteUser && dataDeleteUser.email
                ? dataDeleteUser.email
                : ""}
              " ?
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
