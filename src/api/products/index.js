import Express from "express";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import {
  getProducts,
  getProductsReview,
  writeProducts,
  writeProductsReview,
} from "../../lib/fs-tools.js";
import {
  checkProductReviewSchema,
  checkProductSchema,
  triggerBadRequest,
} from "./validation.js";

const productsRouter = Express.Router();

productsRouter.post(
  "/",
  checkProductSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newProducts = {
        ...req.body,
        id: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const productsArray = await getProducts();
      productsArray.push(newProducts);
      await writeProducts(productsArray);
      res.status(201).send({ id: newProducts.id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

productsRouter.get("/", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    if (req.query && req.query.category) {
      const filteredProducts = productsArray.filter(
        (p) => p.category === req.query.category
      );
      res.send(filteredProducts);
    } else {
      res.send(productsArray);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    const foundProduct = productsArray.find(
      (p) => p.id === req.params.productId
    );
    if (foundProduct) {
      res.send(foundProduct);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    const index = productsArray.findIndex((p) => p.id === req.params.productId);
    if (index !== -1) {
      const oldProduct = productsArray[index];
      const updatedProduct = {
        ...oldProduct,
        ...req.body,
        updatedAt: new Date(),
      };
      productsArray[index] = updatedProduct;
      await writeProducts(productsArray);
      res.send(updatedProduct);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    const remainingProducts = productsArray.filter(
      (p) => p.id !== req.params.productId
    );
    if (productsArray.length !== remainingProducts.length) {
      await writeProducts(remainingProducts);
      res.status(204).send();
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//review
productsRouter.post(
  "/:productId/reviews",
  checkProductReviewSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newReview = {
        ...req.body,
        review_id: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const productsReviewsArray = await getProductsReview();
      productsReviewsArray.push(newReview);
      await writeProductsReview(productsReviewsArray);
      res.status(201).send({ id: newReview.review_id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const reviewArray = await getProductsReview();
    const currentId = reviewArray.some(
      (r) => r.productId === req.params.productId
    );
    if (currentId) {
      res.send(reviewArray);
    } else {
      next(
        createHttpError(
          404,
          `Review with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewArray = await getProductsReview();
    const foundReview = reviewArray.find(
      (r) => r.review_id === req.params.reviewId
    );
    if (foundReview) {
      res.send(foundReview);
    } else {
      next(
        createHttpError(404, `Review with id ${req.params.reviewId} not found!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.put("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewArray = await getProductsReview();
    const index = reviewArray.findIndex(
      (r) => r.review_id === req.params.reviewId
    );
    if (index !== -1) {
      const oldReview = reviewArray[index];
      const updatedReview = {
        ...oldReview,
        ...req.body,
        updatedAt: new Date(),
      };
      reviewArray[index] = updatedReview;
      await writeProductsReview(reviewArray);
      res.send(updatedReview);
    } else {
      next(
        createHttpError(404, `Review with id ${req.params.reviewId} not found!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.delete(
  "/:productId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      const reviewArray = await getProductsReview();
      const remainingReviews = reviewArray.filter(
        (r) => r.review_id !== req.params.reviewId
      );
      if (reviewArray.length !== remainingReviews.length) {
        await writeProductsReview(remainingReviews);
        res.status(204).send("Successfully Deleted");
      } else {
        next(
          createHttpError(
            404,
            `Review with id ${req.params.reviewId} not found!`
          )
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default productsRouter;
