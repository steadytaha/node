const mongoose = require("mongoose");

let instanse = null;

class Database {
  constructor() {
    if (!instanse) {
      this.mongoConnection = null;
      instanse = this;
    }
    return instanse;
  }

  async connect(options) {
    try {
      let db = await mongoose.connect(options.CONNECTION_STRING);
      this.mongoConnection = db;
      console.log("Database connection established");
    } catch (error) {
        console.error("Database connection error", error);
        throw error;
    }
  }
}

module.exports = Database;
