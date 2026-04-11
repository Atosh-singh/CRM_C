import { Modal } from "antd";

function DeleteLeadModal({ open, onCancel, onConfirm, loading, lead }) {
  return (
    <Modal
      title="Delete Lead"
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      confirmLoading={loading}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <p>
        Are you sure you want to delete{" "}
        <strong>{lead?.name || "this lead"}</strong>?
      </p>
    </Modal>
  );
}

export default DeleteLeadModal;