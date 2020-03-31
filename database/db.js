const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "35.239.102.42", //host.docker.internal
  user: "root",
  password: "password", //hratx47hratx47
  database: "pirate_data"
});

const getAllItems = callback =>
  connection.query("SELECT * FROM ArrtoZone_Inventory;", (err, result) => {
    if (err) callback(err, null);
    else callback(null, result);
  });

connection.connect();

module.exports = { connection, getAllItems };
// let itemNameArray = [

//   "treasure chest",
//   "eye patch",
//   "spyglass",
//   "barrels",
//   "treasure map",
//   "cannon balls",
//   "parrot",
//   "dubloons",
//   "hat",
//   "sword",
//   "compass",
//   "peg leg",
//   "boots",
//   "coat",
//   "hoop earrings",
//   "lantern",
//   "bandana",
//   "anchor",
//   "nautical rope",
//   "rum bottles",
//   "shirt",
//   "pants",
//   "anchor",
//   "beer mug"
// ];

// let itemURLArray = [
//   "https://www.theinteriorgallery.com/prod_images_blowup/treasurechest-03.jpg",
//   "https://www.factorydirectparty.com/public/1/media/images/catalog/product//U/S/UST1029/1/LARGE.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/71%2BQWi-ol1L._SL1500_.jpg",
//   "https://img-new.cgtrader.com/items/113241/2683246748/rum-wooden-barrels-pirate-style-3d-model-obj-3ds-dae-skp-mxs.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/71Pk17Mjg4L._AC_SL1010_.jpg",
//   "https://dygtyjqp7pi0m.cloudfront.net/i/35395/30473232_1.jpg?v=8D5E45EB7E218E0",
//   "https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/175773_01",
//   "https://images-na.ssl-images-amazon.com/images/I/81qN%2BqeP91L._AC_SL1500_.jpg",
//   "https://www.heritagecostumes.com/images/products/2422.jpg",
//   "https://i.ebayimg.com/images/g/dfAAAOSwaAtcbn0Y/s-l1600.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/71pIgQwLamL._AC_UL1000_.jpg",
//   "https://atlas-content-cdn.pixelsquid.com/stock-images/pegleg-peg-leg-8JMDkdB-600.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/41jt0hx8axL._AC_.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/61FYmBlG2CL._UL1500_.jpg",
//   "https://partytimebr.com/pub/media/catalog/product/cache/image/800x800/e9c3970ab036de70892d86c6d221abfe/3/9/390108.jpg",
//   "https://atlas-content-cdn.pixelsquid.com/stock-images/ship-candle-lantern-QJ3MaE2-600.jpg",
//   "https://cdn.shopify.com/s/files/1/2075/7331/products/PirateBandana_StellaTree_DeepRed_jpg_1024x1024.jpeg?v=1571710207",
//   "https://i1.pngguru.com/preview/196/984/881/pirates-brown-pirate-anchor.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/61d9vWyEYdL._AC_SL1001_.jpg",
//   "https://img-new.cgtrader.com/items/746698/37710148e7/rum-pirate-bottle-3d-model-max-mat.jpg",
//   "https://s3-eu-west-1.amazonaws.com/images.linnlive.com/57d1c9f731bf15ea2637e49ae025aac1/c9bb6d36-39d8-4f15-852c-b2dc66963381.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/51xa9n2PnDL._UY550_.jpg",
//   "https://cdn.shopify.com/s/files/1/0983/8740/products/Wooden_Anchor_Wall_Decor_Fashion_Themed_Art_Pirate_Nautical_Theme_Party_Smooth_Finish_large.jpg?v=1454813169",
//   "https://contestimg.wish.com/api/webimage/5d88422414af3e2af25d39b7-large.jpg?cache_buster=63aa99be201d3edcc48f12aad19a8383"
// ];

// //"middleware", allows for quick conversion of array of strings containing itemName and itemURL (as received by excel) to sql-syntax value pairs of format ('itemName', 'itemUrl'),
// //for ideal output, remove all double quotation marks

// //in retrospect, I can just use ? templating oops

// const createSQLInsertionValue = (itemName, itemURL) => {
//   let result = [];
//   for (let i = 0; i < itemName.length; i++) {
//     let innerParens = "('" + itemName[i] + "'," + "'" + itemURL[i] + "')";
//     result.push(innerParens);
//   }
//   return result;
// };
