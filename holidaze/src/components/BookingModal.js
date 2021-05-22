import EnquiryForm from "./EnquiryForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = props => {

    if (!props.show) {
        return null;
    }

    return (
        <div className={"modal"}>
            <div className={"modal-content"}>
                <div className={"modal-header"}>
                    <button className="modal-close" onClick={props.onClose}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
                <div className={"modal-body"}>
                    <EnquiryForm />
                </div>
            </div>
        </div>
    );
};

export default Modal;
