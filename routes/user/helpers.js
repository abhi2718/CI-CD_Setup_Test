const User = require('../../modals/user');
exports.getUser = async (search) => {
    // return User.findOne(
    //     {
    //     $text: {
    //         $search: search
    //     }
    // })
    // return User.aggregate([
    //     {
    //         $facet: {
    //             items: [{
    //                 $skip: skip
    //             },
    //             {
    //                 $limit: pageSize
    //             }
    //             ]
    //         }
    //     },
    //     {
    //         $addFields: {
    //             page,
    //             pageSize
    //         }
    //     },
    //     {
    //         $project: {
    //             items: 1,
    //             page: 1,
    //             pageSize: 1
    //         }
    //     }
    // ]);
    return User.findById("67aeff3b76b42cf1a6bb0a29");
}

module.exports = exports;