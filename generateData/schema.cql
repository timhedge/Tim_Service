CREATE KEYSPACE relatedItem WITH replication =
  {‘class’: ‘SimpleStrategy’, ‘replication_factor’ : 1};

CREATE TABLE relatedItem.items (
  partitionGroup int,
  itemId int,
  productName text,
  imageUrl text,
  PRIMARY KEY (partitionGroup, itemId)
);