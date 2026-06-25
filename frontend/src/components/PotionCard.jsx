const PotionCard = ({ potion }) => {
  return (
    <div className="potion-card">
      <div className="potion-card__image-wrapper">
        <img
          src={potion.image}
          alt={potion.name}
          className="potion-card__image"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/7978124/pexels-photo-7978124.jpeg?auto=compress&cs=tinysrgb&w=800";
          }}
        />
      </div>
      <div className="potion-card__body">
        <h3 className="potion-card__name">{potion.name}</h3>
        <p className="potion-card__desc">{potion.description}</p>
        <div className="potion-card__footer">
          <span className="potion-card__price">{potion.price} moedas</span>
          <button className="btn btn--primary">Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default PotionCard;
