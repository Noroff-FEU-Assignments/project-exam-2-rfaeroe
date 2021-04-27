import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Item = props => {
    const { id, name, description, price, image, facilities, location } = props;

    const history = useHistory();
    const handleClick = (id) => {
        history.push(`/est/${id}`);
    };

    return (
        <div onClick={() => handleClick(id)} className={"establishments-card-inner"}>
            <img className={"card-image"} src={image} alt={name} />
            <div className={"card-inner-content"}>
                <h2 className={"card-title col-d-12"}>{name}</h2>
                <p className={"card-price col-d-12"}>{price}$/night</p>
                <p className={"card-desc col-d-12"}>{description}</p>
                <p className={"card-desc col-d-12"}>{facilities}</p>
                <p className={"card-desc col-d-12"}>{location}</p>
                <button className={"button card-button col-d-6"}>Book Now</button>
            </div>
        </div>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};


export default Item;