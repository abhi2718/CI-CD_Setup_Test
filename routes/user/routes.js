const userHelpers = require("./helpers");
exports.get = async (req, res, next) => {
  // const pageSize = req.query?.pageSize ? Number(req.query.pageSize) : 10;
  // const page = req.query?.page ? Number(req.query.page) : 1;
  // const skip = (page - 1) * page;
  const {search} = req.query
  try {
    const data = await userHelpers.getUser(search);
    //console.log("Data is here ---->",data);
    res.status(200).json({
      success: true,
      data
      // users: data[0].items,
      // page: data[0].page,
      // pageSize: data[0].pageSize
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
