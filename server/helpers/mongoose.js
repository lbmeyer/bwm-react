module.exports = {
  normalizeErrors: function(errors) {
    let normalizeErrors = [];

    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        normalizeErrors.push({title: property, detail: errors[property].message})
      }
    }

    return normalizeErrors;
  }
}

// Original mongoose error object
// {
//   "errors": {
//       "email": {
//           "message": "Path `email` is invalid (johnny2@gmail).",
//           "name": "ValidatorError",
//           "properties": {
//               "message": "Path `email` is invalid (johnny2@gmail).",
//               "type": "regexp",
//               "regexp": {},
//               "path": "email",
//               "value": "johnny2@gmail"
//           },
//           "kind": "regexp",
//           "path": "email",
//           "value": "johnny2@gmail"
//       }
//   },
//   "_message": "User validation failed",
//   "message": "User validation failed: email: Path `email` is invalid (johnny2@gmail).",
//   "name": "ValidationError"
// }

// Custom error object
// {
//   "errors": [
//     {
//       "title": "Invalid password!",
//       "details": "Password is not the same as confirmation password"
//     }
//   ]
// }