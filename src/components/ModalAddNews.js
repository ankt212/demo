import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
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

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleClose();
      // success
      setFormModal({ name: "", job: "" });
      toast.success("A User is created successed");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("An error ...");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
