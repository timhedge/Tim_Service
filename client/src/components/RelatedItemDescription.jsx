import React from "react";

const RelatedItemDescription = props => {
  return (
    <div className="recommended-item-description-parent">
      <p
        className="recommended-item-description"
        onClick={() => {
          props.onClick(props);
        }}
      >
        {props.description}
      </p>
    </div>
  );
};
export default RelatedItemDescription;
