import React from "react";

const RelatedItem = props => {
  return (
    <div key={props.imageIDRender} className="recommended-item-container">
      <img
        height="70"
        width="70"
        src={props.image}
        onClick={() => {
          props.onClick(props);
        }}
      />
    </div>
  );
};
export default RelatedItem;
