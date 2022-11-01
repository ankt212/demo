import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, handleEditUserFromModal, dataUserEdit } = props;
  const [formModal, setFormModal] = useState({
    id: "",
    name: "",
    job: "",
  });
  const { id, name, job } = formModal;

  const onChangeForm = (event) => {
    setFormModal({
      ...formModal,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditUser = async () => {
    let res = await putUpdateUser(id, formModal);
    if (res && res.updatedAt) {
      handleClose();
      // success
      setFormModal({ name: "", job: "" });
      toast.success("A User is update successed");
      handleEditUserFromModal({ first_name: name, id: dataUserEdit.id });
    } else {
      toast.error("An error ...");
    }
  };

  useEffect(() => {
    if (show) {
      setFormModal({
        name: dataUserEdit.first_name,
      });
    }
  }, [dataUserEdit]);

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
