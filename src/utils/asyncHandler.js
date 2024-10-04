const asyncHanlder = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHanlder };

// one way of writing the async handler function

// const asyncHanlder = (fn) => async (req, res, next) => {
//   try {
//     await (req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
