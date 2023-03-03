import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Please fill in a name",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Please fill in a description",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "Please fill in a brand",
    },
  },
  price: {
    in: ["body"],
    //   //changes needed to check if it is checking number
    isInt: {
      errorMessage: "Please fill in a price",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Please fill in a category",
    },
  },
};

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "Please do not leave the comment blank",
    },
  },
  rate: {
    in: ["body"],
    isInt: {
      errorMessage: "Please rate 1 - 5",
    },
  },
  productId: {
    in: ["body"],
    isString: {
      errorMessage: "Product's Id must be provided",
    },
  },
};

export const checkProductSchema = checkSchema(productSchema);
export const checkProductReviewSchema = checkSchema(reviewSchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (errors.isEmpty()) {
    next();
  } else {
    next(
      createHttpError(400, "Errors during product validation", {
        errorsList: errors.array(),
      })
    );
  }
};
