import EnquiryForm from "./EnquiryForm";

const Modal = props => {

    if (!props.show) {
        return null;
    }

    return (
        <div className={"modal"}>
            <div className={"modal-content"}>
                <div className={"modal-header"}>
                    <h2 className={"modal-title"}>Booking enquiry</h2>
                </div>
                <div className={"modal-body"}>
                    <EnquiryForm />
                </div>
                <div className={"modal-footer"}>
                    <button onClick={props.onClose}>Close</button>
                </div>

            </div>
        </div>
    );
};

export default Modal;
