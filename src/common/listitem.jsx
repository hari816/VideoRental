import React from "react";

const ListItem = props => {
  const {
    items,
    valueProperty,
    textProperty,
    selectedGenre,
    onItemSelect
  } = props;
  return (
    <ul className="list-group m-2">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            selectedGenre === item
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListItem.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListItem;
