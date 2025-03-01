app.get('/users', async (req, res) => {
    const page = req.query?.page ? req.query.page : 1;
    const pageSize = req.query?.pageSize ? Number(req.query.pageSize) : 2;
    const skip = Number((page - 1) * pageSize);
    try {
      const data = await User.aggregate([
        {
          $facet: {
            items: [
              {
                $skip:skip
              },
              {
                $limit:pageSize
              }
            ],
            count: [
              {
                $count:"count"
              }
            ]
          }
        },
        {
          $addFields: {
           count:"$count.count",
            page,
            pageSize
          }
        },
        {
          $project: {
            items: 1,
            page:1,
            pageSize: 1,
            count:1
          }
        },
        {
          $sort: {
            createdAt:1
          }
        }
      ]);
  
      res.status(200).json({
        success: true,
        users: data[0].items,
        page: data[0].page,
        pageSize: data[0].pageSize
      });
    } catch (error) {
      console.log(error)
    }
  });
  
  
  // Operator
  // 1. Compare Operator -> https://www.mongodb.com/docs/manual/reference/operator/query/
  // 2. Logical Operator
  app.get("/user", async (req, res) => {
    const users = await User.find({
      //Compare Operator
  
      // age: {
      //   $gt: 18,
      // },
  
      //Logical Operator
      // $and: [
      //   {
      //     name: { $eq: "John" },
      //   },
      // ],
  
    });
    res.status(200).json({
      success: true,
      users: users,
      count: users.length,
    });
  });
  
  app.get('/user/:id', async (req, res) => {
    // const user = await User.findOneAndUpdate({
    //   name: 'Alice',
    //   $set: {
    //     age:38,
    //     "marks.maths":50
    //   }
    // });
    // const user = await User.findByIdAndUpdate(req.params.id,{
    //   $set: {
    //    // "tags.0": "Maths",
    //     // ratings:{
    //     //   by: "Abhishek Singh",
    //     //   rating:5
    //     // }
    //     "ratings.0.rating":4.5
    //   }
    // }, {
    //   new: true,
    // });
    const user = await User.aggregate([
      // {
      //   $match: {
      //     age: {
      //       $gt: 26,
      //     }
      //   }
      // },
      // {
      //   $project: {
      //     _id:1,
      //     name: 1,
      //     age: 1,
      //   }
      // },
      {
        $facet: {
          users: [{
            $match: {
              age: {
              $gt: 26,
            }}
          },
            
          ],
          userData:[{
            $project: {
              _id: 1,
              name: 1,
              age: 1,
            }
          }]
          // rating: [{
          //   $avg: "$ratings.rating"
          // }]
        }
      },
      {
        $project: {
          users: 1,
          //userData: 1,
        }
      }
      // },
      // {
      //   $group: {
      //     _id: "$age",
      //     data:{$push:"$$ROOT"}
      //   }
      // },
      // {
      //   $unwind:"$data"
      // },
      // {
      //   $group: {
      //     _id: null,
      //     data:{$push:"$data"}
      //   }
      // }
    ]);
    console.log(user)
    res.status(200).json({
      success: true,
      users:user,
      count:user.length
    });
  })
// {
//   $addFields: {
//     numberOfTagsPerUser:{
//       $size:{
//         $ifNull:['$tags',[]]
//       }
//     }
//   }
// },
// {
//   $group: {
//     _id: null,
//     average:{
//       $avg:"$numberOfTagsPerUser"
//     }
//   }
// }