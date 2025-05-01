import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <div className="modal-content">{children}</div>
                <button className="modal-close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
