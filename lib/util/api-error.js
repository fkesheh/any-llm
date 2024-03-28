"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiError = void 0;
class ApiError extends Error {
  constructor(message, status) {
    super(message); // Call the constructor of the base Error class with the message.
    this.name = 'ApiError'; // Set the error name to "ApiError".
    this.status = status; // Set the custom status property.
  }
}
exports.ApiError = ApiError;