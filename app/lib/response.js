const CustomError = require("./error");
const Enum = require("../config/enum");

class Response {
  constructor() {}

  static successResponse(data, status = 200) {
    return {
      status: status,
      data: data,
    };
  }

  static errorResponse(error) {
    if (error instanceof CustomError) {
      return {
        status: error.status,
        error: {
          message: error.message,
          description: error.description,
        },
      };
    }

    return {
      status: Enum.HTTP_CODES.INTERNAL_SERVER_ERROR,
      error: {
        message: 'Unknown error!',
        description: error.message,
      },
    };
  }
}

module.exports = Response;
