const Joi = require("@hapi/joi");

const OPTIONS = {
  language: {
    key: "{{label}} ",
  },
};

// wishlist validation
const WISHLIST = (WishListData) => {
  const WishListSchema = Joi.object().keys({
    productId: Joi.string().required().label("productId"),
    userId: Joi.string().required().label("userId"),
  });
  return Joi.validate(WishListData, WishListSchema, OPTIONS);
};

module.exports = {
  WISHLIST,
};
