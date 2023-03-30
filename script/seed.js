"use strict";

const {
  db,
  models: { User, Plant, Plant_Detail },
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
      description: "Colorful and bold with hints of red on two-toned leaves",
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

  const plant_details = await Promise.all([
    Plant_Detail.create({
      size: "sm",
      light: "indirect",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "A fan favorite, the Money Tree features a hand-braided trunk that brings personality to any space. Tall, lush leaves sprout from long stems, giving this plant a jungle flair anyone would be envious of. Known for its good fortune, the Money Tree makes the perfect gift of luck for beginners and plant enthusiasts alike. With a native range from Mexico to northern South America, the Money Tree is also very popular in Taiwan and other East Asian countries. This charming plant is easy to care for and can be placed in a variety of lighting, from low to indirect bright light. Water when the soil volume is half dry and keep the gorgeous leaves looking their best with regular dusting.",
      botanical_name: "Pachira aquatica",
      common_name: "Money Tree",
      plantId: 1,
    }),
    Plant_Detail.create({
      size: "md",
      light: "direct",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "The Bird of Paradise plant is a stunning tropical plant that can add a touch of exotic beauty to any room. With its large, glossy leaves and bright orange and blue flowers, it's a showstopper. Native to South Africa, this plant prefers bright, indirect light and well-draining soil. Keep the soil consistently moist but not waterlogged and mist the leaves regularly to keep them looking their best. With the right care, this plant can thrive and provide a touch of paradise in your home.",
      botanical_name: "Strelitzia nicolai",
      common_name:
        "White Bird, White Bird of Paradise, Giant Bird of Paradise, Natal Wild Banana",
      plantId: 2,
    }),
    Plant_Detail.create({
      size: "md",
      light: "direct",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "When you order a Bromeliad Pineapple you’re not just gifting the perfect present or adding more foliage to your home, you’re ordering a tropical experience. Every plant arrives with an adorable pineapple above its green leaves. While the Bromeliad Pineapple will only grow one pineapple per plant, it should grow “pups” from the mother plant which will eventually grow their own fruit. What’s best is that this bromeliad is easy to care for, meaning you can enjoy this natural wonder without much work. Bromeliad Pineapples are native to South America. However, they are grown in many locations around the world for the cultivation of their fruit. Your Bromeliad Pineapple is ornamental, so it will not grow as large as an edible commercial pineapple. Keep in indirect bright light and only water when the soil volume is almost all the way dry.",
      botanical_name: "Ananas comosus",
      common_name: "Bromeliad, Pineapple Plant",
      plantId: 3,
    }),
    Plant_Detail.create({
      size: "xs",
      light: "direct",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "The African Violet is a charming and colorful flowering plant that can add a pop of color to any room. With its fuzzy leaves and bright flowers in shades of pink, purple, and white, it's a joy to behold. Native to East Africa, this plant prefers bright, indirect light and well-draining soil. Water from the bottom to prevent water from getting on the leaves, and fertilize regularly to keep the blooms coming. With the right care, this plant can provide years of enjoyment.",
      botanical_name: "Saintpaulia ionantha",
      common_name: "African Violet, Saintpaulia",
      plantId: 4,
    }),
    Plant_Detail.create({
      size: "xl",
      light: "indirect",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "The Fiddle Leaf Fig is a popular and stylish houseplant that can add a touch of elegance to any space. With its large, glossy leaves and tall stature, it's a statement piece. Native to tropical regions of Africa, this plant prefers bright, indirect light and well-draining soil. Water when the soil is dry to the touch and fertilize regularly to keep the leaves looking their best. With its striking presence and easy care, the Fiddle Leaf Fig is a must-have for any plant lover.",
      botanical_name: "Ficus lyrata",
      common_name: "Fiddle Leaf Fig",
      plantId: 5,
    }),
    Plant_Detail.create({
      size: "xl",
      light: "direct",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "The Schefflera Arboricola, also known as the Dwarf Umbrella Tree, is a charming and easy-to-care-for plant that can add a touch of green to any room. With its glossy, dark green leaves and graceful shape, it's a joy to behold. Native to Taiwan, this plant prefers bright, indirect light and well-draining soil. Water when the top inch of soil is dry and fertilize regularly to keep the leaves looking their best. With its attractive foliage and low maintenance, the Schefflera Arboricola is a great choice for beginners and experienced plant lovers alike.",
      botanical_name: "Schefflera arboricola, heptapleurum arboricola",
      common_name:
        "Braided Schefflera, Dwarf Umbrella, Dwarf Schefflera, Parasol Plant, Hawaiian Schefflera, Octopus plant, Small-leaved Schefflera",
      plantId: 6,
    }),
    Plant_Detail.create({
      size: "sm",
      light: "indirect",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "With its striking foliage and colorful leaves, the Red Prayer Plant is a popular houseplant that can add a touch of drama to any room. Native to South America, this plant prefers bright, indirect light and well-draining soil. Water when the top inch of soil is dry and mist the leaves regularly to keep them looking their best. With its tendency to fold its leaves up at night, the Red Prayer Plant is also known as the 'prayer plant'. With the right care, this plant can provide years of enjoyment and a touch of natural beauty to your home.",
      botanical_name: "Maranta leuconeura",
      common_name: "Prayer Plant, Herringbone Plant, Maranta Prayer Plant",
      plantId: 7,
    }),
    Plant_Detail.create({
      size: "md",
      light: "direct",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "The Peperomia Watermelon is a charming and unique plant that can add a touch of whimsy to any space. With its round leaves that resemble watermelon rinds and its trailing vines, it's a joy to behold. Native to Central and South America, this plant prefers bright, indirect light and well-draining soil. Water when the top inch of soil is dry and avoid getting water on the leaves to prevent rot. With its low maintenance and attractive foliage, the Peperomia Watermelon is a great choice for plant lovers of all levels.",
      botanical_name: "Peperomia argyreia",
      common_name: "Watermelon Plant, Watermelon Peperomia, Watermelon Begonia",
      plantId: 8,
    }),
    Plant_Detail.create({
      size: "lg",
      light: "direct",
      pet_friendly: true,
      air_cleaner: true,
      full_description:
        "The Bamboo Palm is a popular and stylish houseplant that can add a touch of tropical elegance to any room. With its slender trunks and graceful fronds, it's a statement piece. Native to Central and South America, this plant prefers bright, indirect light and well-draining soil. Water when the soil is dry to the touch and fertilize regularly to keep the leaves looking their best. With its air-purifying qualities and ability to thrive in low-light conditions, the Bamboo Palm is a great choice for those looking to add a touch of green to their indoor space.",
      botanical_name: "Chamaedorea seifrizii",
      common_name: "Bamboo Palm, Reed Palm, Clustered Parlor Palm, Cane Palm",
      plantId: 9,
    }),
  ]);
  // const cart_items = await Promise.all([
  //   Cart_Item.create({ id: 1, quantity: 2, plantId: 1, userId: 1 }),
  //   Cart_Item.create({ id: 2, quantity: 1, plantId: 1, userId: 2 }),
  //   Cart_Item.create({ id: 3, quantity: 1, plantId: 3, userId: 2 }),

  // ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${plants.length} plants`);
  console.log(`seeded ${plant_details.length} plant details`);
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
