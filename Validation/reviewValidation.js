const Joi = require("@hapi/joi");
const { join } = require("path");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// Review validation
const REVIEW = (ReviewData) => {
  const ReviewSchema = Joi.object().keys({
    productId: Joi.string().required().label("productId"),
    userId: Joi.string().required().label("userId"),
    reviewText: Joi.string().required().label("review"),
  });
  return Joi.validate(ReviewData, ReviewSchema, OPTIONS);
};

module.exports = {
  REVIEW,
};
