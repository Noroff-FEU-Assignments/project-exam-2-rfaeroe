
const ContactModal = props => {
    const { fromName, email, subject, message } = props;

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
                        <li>From name:<span>{fromName}</span></li>
                        <li>From email: <span>{email}</span></li>
                        <li>Subject: <span>{subject}</span></li>
                        <li>Message: <span>{message}</span></li>
                    </ul>
                </div>
                <div className={"modal-footer"}>
                    <a href={`mailto:${email}`}>Reply</a>
                    <button onClick={props.onClose}>Close</button>

                </div>

            </div>
        </div>
    );
};

export default ContactModal;