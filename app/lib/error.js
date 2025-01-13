class CustomError extends Error {
  constructor(status, message, description) {
    super(
      `{
        status: ${status},
        message: ${message},
        description: ${description},
        }`
    );
    this.status = status;
    this.message = message;
    this.description = description;
  }
}

module.exports = CustomError;
