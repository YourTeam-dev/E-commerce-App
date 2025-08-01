const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
dotenv.config();

const Category = require("../model/Category.model");
const User = require("../model/user.model");
const Seller = require("../model/seller.model");
const Product = require("../model/Product.model");
const Comment = require("../model/Comment.model");
const Review = require("../model/Review.model");
const Order = require("../model/Order.model");
const Historic = require("../model/Historic.model");
const Hero = require("../model/Hero.model");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Promise.all([
      Category.deleteMany(),
      User.deleteMany(),
      Seller.deleteMany(),
      Product.deleteMany(),
      Comment.deleteMany(),
      Review.deleteMany(),
      Order.deleteMany(),
      Historic.deleteMany(),
      Hero.deleteMany(),
    ]);

    const categories = [];
    for (let i = 0; i < 5; i++) {
      const cat = new Category({
        parentId: null,
        title: faker.commerce.department(),
      });
      await cat.save();
      categories.push(cat);
    }
    for (let i = 0; i < 5; i++) {
      const hero = new Hero({
        title: faker.company.catchPhrase(),
        subtitle: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos({ width: 800, height: 400 }),
      });

      await hero.save();
    }
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
      });
      await user.save();
      users.push(user);
    }

    const sellers = [];
    for (let i = 0; i < 3; i++) {
      const user = users[i]; // pick first few users as sellers
      const seller = new Seller({
        userId: user._id,
        adress: faker.location.streetAddress(),
        phoneNumber: faker.phone.number("05########"),
      });
      await seller.save();

      user.isSeller = seller._id;
      await user.save();

      sellers.push(seller);
    }

    const products = [];
    for (let i = 0; i < 20; i++) {
      const product = new Product({
        sellerId: faker.helpers.arrayElement(sellers)._id,
        categoryId: [faker.helpers.arrayElement(categories)._id],
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        color: faker.color.human(),
        size: faker.helpers.arrayElement(["S", "M", "L", "XL"]),
        images: [faker.image.url()],
        price: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
        promo: faker.number.int({ min: 0, max: 50 }),
        quantity: faker.number.int({ min: 0, max: 100 }),
        rating: 0,
        commentId: [],
        reviewId: [],
      });
      await product.save();
      products.push(product);
    }

    const comments = [];
    for (let i = 0; i < 40; i++) {
      const comment = new Comment({
        productId: faker.helpers.arrayElement(products)._id,
        userId: faker.helpers.arrayElement(users)._id,
        commentText: faker.lorem.sentence(),
      });
      await comment.save();
      comments.push(comment);
    }

    const reviews = [];
    for (let i = 0; i < 40; i++) {
      const ratingValue = faker.number.float({
        min: 0,
        max: 5,
        precision: 0.1,
      });
      const review = new Review({
        productId: faker.helpers.arrayElement(products)._id,
        userId: faker.helpers.arrayElement(users)._id,
        review: ratingValue,
      });
      await review.save();
      reviews.push(review);
    }

    for (const product of products) {
      const productComments = comments.filter((c) =>
        c.productId.equals(product._id)
      );
      const productReviews = reviews.filter((r) =>
        r.productId.equals(product._id)
      );
      const avgRating =
        productReviews.reduce((acc, r) => acc + r.review, 0) /
        (productReviews.length || 1);

      product.commentId = productComments.map((c) => c._id);
      product.reviewId = productReviews.map((r) => r._id);
      product.rating = Number(avgRating.toFixed(1));
      await product.save();
    }

    for (let i = 0; i < 10; i++) {
      const orderedProducts = faker.helpers.arrayElements(
        products,
        faker.number.int({ min: 1, max: 5 })
      );

      const listeProduct = orderedProducts.map((p) => ({
        productId: p._id,
        quantity: faker.number.int({ min: 1, max: 5 }),
      }));

      const totalPrice = listeProduct.reduce((acc, item) => {
        const product = products.find((p) => p._id.equals(item.productId));
        return acc + (product?.price || 0) * item.quantity;
      }, 0);

     
      );

      const listeProduct = orderedProducts.map((p) => ({
        productId: p._id,
        quantity: faker.number.int({ min: 1, max: 5 }),
      }));

      const totalPrice = listeProduct.reduce((acc, item) => {
        const product = products.find((p) => p._id.equals(item.productId));
        return acc + (product?.price || 0) * item.quantity;
      }, 0);

      const order = new Order({
        userId: faker.helpers.arrayElement(users)._id, // assuming you have a `users` array
        listeProduct,
        totalPrice: Number(totalPrice.toFixed(2)),
        aproveIt: faker.datatype.boolean(),
      });

      await order.save();
    }

    const actions = [
      "ADD",
      "UPDATE",
      "DELETE",
      "COMMENT",
      "REVIEW",
      "VALIDATE",
    ];
    for (let i = 0; i < 20; i++) {
      const historic = new Historic({
        userId: faker.helpers.arrayElement(users)._id,
        title: faker.lorem.words(3),
        action: faker.helpers.arrayElement(actions),
        discription: faker.lorem.sentence(),
      });
      await historic.save();
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database Seeding error:", error);
    process.exit(1);
  }
}

seed();