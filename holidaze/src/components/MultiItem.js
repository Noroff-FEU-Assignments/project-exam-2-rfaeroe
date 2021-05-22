import PropTypes from "prop-types";

const MultiItem = props => {
    const { id, name, description, price, image } = props;

    return (
        <div className={"establishments-card-inner"}>
            <img className={"card-image"} src={image} alt={name} />
            <div className={"card-inner-content"}>
                <h2 className={"card-title"}>{name}</h2>
                <p className={"card-price"}>{price}$ /Night</p>
                <p className={"card-desc"}>{description}</p>
                <a href={`details/${id}`} className={"card-readmore"}>View more</a>
            </div>
        </div>
    );
};

MultiItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};


export default MultiItem;