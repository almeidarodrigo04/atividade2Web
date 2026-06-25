const AdminPotionRow = ({ potion, onDelete }) => {
  return (
    <tr className="admin-table__row">
      <td className="admin-table__cell">
        <img
          src={potion.image}
          alt={potion.name}
          className="admin-table__thumb"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/7978124/pexels-photo-7978124.jpeg?auto=compress&cs=tinysrgb&w=400";
          }}
        />
      </td>
      <td className="admin-table__cell admin-table__cell--name">{potion.name}</td>
      <td className="admin-table__cell admin-table__cell--desc">{potion.description}</td>
      <td className="admin-table__cell">{potion.price} moedas</td>
      <td className="admin-table__cell">
        <button className="btn btn--danger" onClick={() => onDelete(potion.id)}>
          Remover
        </button>
      </td>
    </tr>
  );
};

export default AdminPotionRow;
