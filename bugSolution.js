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
    $addFields: {
      results: {
        $ifNull: ["$results", []],
      },
    },
  },
  {
    $unwind: {
      path: "$results",
      preserveNullAndEmptyArrays: true,
    },
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