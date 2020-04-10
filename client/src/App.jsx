import React, { Component } from "react";
import axios from "axios";
import RelatedItem from "./components/RelatedItem";
import RelatedItemDescription from "./components/RelatedItemDescription";

class RelatedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesURL: [],
      description: [],
      imageID: []
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8082/items"
      )
      .then(response => {
        console.log(response.data);
        let randomItemsURL = [];
        let randomItemsName = [];
        let randomItemsID = [];

        for (let i = 0; i < response.data.length; i++) {
          randomItemsURL.push(response.data[i].imageurl);
          randomItemsName.push(response.data[i].productname);
          randomItemsID.push(response.data[i].id);
        }

        this.setState({
          imagesURL: [...randomItemsURL],
          description: [...randomItemsName],
          imageID: [...randomItemsID]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  clickHandler(event, imageIDRender) {
    // console.log(event.imageIDRender);
    window.localStorage.setItem("productID", event.imageIDRender);
    window.localStorage.setItem("updated", false);
  }

  render() {
    return (
      <div className="other-customers-parent-div">
        <div>
          <h1 id="relatedItemsHeader">
            <span>OTHER CUSTOMERS ALSO VIEWED</span>
          </h1>
          <div>
            {this.state.imagesURL.map((singleImage, index) => {
              const description = this.state.description[index];
              const imageIDRender = this.state.imageID[index];

              return (
                <div key={index} className="item-description-parent">
                  <RelatedItem
                    key={index}
                    imageIDRender={imageIDRender}
                    onClick={event => {
                      this.clickHandler(event, imageIDRender);
                    }}
                    image={singleImage}
                  />
                  <RelatedItemDescription
                    imageIDRender={imageIDRender}
                    onClick={this.clickHandler}
                    description={description}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedItems;
