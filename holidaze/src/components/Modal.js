
const Modal = props => {
    const { fromDate, toDate, children, adults, name } = props;

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
                    <ul>
                        <li>Establishment:<span>{name}</span></li>
                        <li>From: <span>{fromDate}</span></li>
                        <li>To: <span>{toDate}</span></li>
                        <li>Adults: <span>{adults}</span></li>
                        <li>Children: <span>{children}</span></li>
                    </ul>
                </div>
                <div className={"modal-footer"}>
                    <button onClick={props.onClose}>Close</button>
                </div>

            </div>
        </div>
    );
};

export default Modal;
