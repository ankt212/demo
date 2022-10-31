import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, handleUpdateTable, dataUserEdit } = props;
  const [formModal, setFormModal] = useState({
    name: "",
    job: "",
  });
  const { name, job } = formModal;
  const onChangeForm = (event) => {
    setFormModal({
      ...formModal,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (show) {
      setFormModal({
        name: dataUserEdit.first_name,
      });
    }
  }, [dataUserEdit]);

  const handleEditUser = () => {};
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={onChangeForm}
                  name="name"
                />

                <div className="mb-3">
                  <label className="form-label">Job</label>
                  <input
                    type="text"
                    className="form-control"
                    value={job}
                    name="job"
                    onChange={onChangeForm}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
