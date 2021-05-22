import PropTypes from "prop-types";
import { useState } from "react";
import BookingModal from "../components/BookingModal";

const SingleItem = props => {
    const [establishment, setEstablishments] = useState([]);
    const [show, setShow] = useState(false);

    const { name, description, price, image } = props;
    return (
        <div className="establishments-card-inner">
            <img className="card-image" src={image} alt={name} />
            <div className="card-inner-content">
                <h2 className="card-title">{name}</h2>
                <p className="card-price">{price}$ /night</p>
                <p className="card-desc">{description}</p>
                <button key={establishment.id} onClick={() => setShow(true)} className={"button establishment-button"} >
                    Book
                </button>
                <BookingModal onClose={() => setShow(false)} show={show} />
            </div>
        </div>
    );
};

SingleItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};


export default SingleItem;