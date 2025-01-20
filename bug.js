```javascript
const pipeline = [
  {
    $lookup: {
      from: "collection2",
      localField: "_id",
      foreignField: "foreignKey",
      as: "results",
    },
  },
  {
    $unwind: "$results",
  },
  {
    $match: {
      "results.someField": {
        $exists: false,
      },
    },
  },
];

const result = await db.collection('collection1').aggregate(pipeline).toArray();
```