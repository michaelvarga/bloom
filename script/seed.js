"use strict";

const {
  db,
  models: { User, Plant, Cart_Item },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", isAdmin: true }),
    User.create({ username: "murphy", password: "123", isAdmin: false }),
  ]);

  const plants = await Promise.all([
    Plant.create({
      name: "Money Tree",
      price: 169,
      description:
        "Popular for its use in Feng Shui, the Money Tree is a pet-friendly and air-purifying plant with large star-shaped leaves and a braided trunk to give your home a tropical feel.",
      location: "Indoor",
      care: "No-Fuss",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_money-tree_stone.jpg?ver=279410",
      inventory: 50,
    }),
    Plant.create({
      name: "Bromeliad Pineapple",
      price: 79,
      description:
        "Add a tropical splash to any space with this truly unique flowering Bromeliad that grows edible pineapple fruit.",
      location: "Indoor",
      care: "No-Fuss",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bromeliad-pineapple_indigo-e1628794021645.jpg?ver=279193",
      inventory: 0,
    }),
    Plant.create({
      name: "Bird of Paradise",
      price: 199,
      description:
        "Impressive and tropical with large, glossy leaves that naturally split over time.",
      location: "Outdoor",
      care: "Easy",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bird-of-paradise_indigo.jpg?ver=279491",
      inventory: 10,
    }),
    Plant.create({
      name: "African Violet",
      price: 35,
      description:
        "Beyond its vibrant blossoms, the African Violet also has soft fuzzy leaves that give it a one-of-a-kind aesthetic. This plant makes a great gift. Given the right watering and lighting, it will bloom for years to come.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2022/03/bloomscape_african-violet_pink_small_detail1.jpg?ver=697052",
      inventory: 5,
    }),
    Plant.create({
      name: "Fiddle Leaf Fig",
      price: 35,
      description:
        "Tall, sculptural, and dramatic. This plant will flourish in the right conditions.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_fiddle-leaf-fig_charcoal-alt-e1625252593949.jpg?ver=279576",
      inventory: 5,
    }),
    Plant.create({
      name: "Schefflera Arboricola",
      price: 35,
      description:
        "With dramatic, umbrella-shaped leaf formations and braided trunk, the Schefflera Arboricola is a no-fuss tree that’s nearly 4 feet tall. Perfect for cozy reading nooks and small spaces where it can receive bright, indirect light.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_schefflera-arboricola_clay.jpg?ver=279602",
      inventory: 5,
    }),
    Plant.create({
      name: "Red Prayer Plant",
      price: 35,
      description:
        "Colorful and bold with hints of red on two-toned leaves",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2021/06/bloomscape_red-prayer-plant_charcoal_0621-scaled-e1625244693185.jpg?ver=542553",
      inventory: 5,
    }),
    Plant.create({
      name: "Peperomia Watermelon",
      price: 35,
      description:
        "Fitting its fun name, the Peperomia Watermelon’s round leaves look like striped green and white melon rinds supported by red stems. The Peperomia Watermelon is adaptable to a variety of light levels and is easy to care for. This peperomia is also fun to propagate through stem or leaf cuttings, making it the perfect educational activity for families..",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2022/03/bloomscape_african-violet_pink_small_detail1.jpg?ver=697052",
      inventory: 5,
    }),
    Plant.create({
      name: "Bamboo Palm",
      price: 35,
      description:
        "With dense foliage and lush fronds, the Bamboo Palm makes a statement. An air-purifying plant adaptable to low light, this palm can reach heights of up to 8 feet tall in the right conditions..",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bamboo-palm_stone.jpg?ver=279484",
      inventory: 5,
    }),
  ]);
  // const cart_items = await Promise.all([
  //   Cart_Item.create({ id: 1, quantity: 2, plantId: 1, userId: 1 }),
  //   Cart_Item.create({ id: 2, quantity: 1, plantId: 1, userId: 2 }),
  //   Cart_Item.create({ id: 3, quantity: 1, plantId: 3, userId: 2 }),

  // ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${plants.length} plants`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    plants: {
      moneyTree: plants[0],
      bromeliad: plants[1],
      birdOfParadise: plants[2],
      africanViolet: plants[3],
    },
    // cart_items: {
    //   firstItem: cart_items[0],
    //   secondItem: cart_items[1],
    //   thirdItem: cart_items[2]
    // }
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
