const joi = require("joi");

const validateAddUsers = (user) => {
  const schema = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().min(3).max(100).required(),
    password: joi.string().min(3).max(100).required(),
  });
  return schema.validate(user);
};

module.exports = { validateAddUsers };
