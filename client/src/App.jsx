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
      imageID: 0
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://mattservice-env.eba-grpmrn9j.us-east-2.elasticbeanstalk.com/items"
      )
      .then(response => {
        let randomItemsURL = [];
        let randomItemsName = [];
        let randomItemsID = [];
        while (randomItemsURL.length < 6) {
          let randomIndex = Math.floor(
            Math.random() * Math.floor(response.data.length)
          );
          // console.log(response.data[randomIndex]);
          randomItemsURL.push(response.data[randomIndex].item_url);
          randomItemsName.push(response.data[randomIndex].item_name);
          randomItemsID.push(response.data[randomIndex].itemID);
          response.data.splice(randomIndex, 1);
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
                <div className="item-description-parent">
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
