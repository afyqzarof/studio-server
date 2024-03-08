const bcrypt = require("bcrypt");
module.exports = [
  {
    id: 1,
    username: "nuclear.instruments",
    email: "nuclear@instruments.my",
    password: bcrypt.hashSync("password123", 6),
    bio: "indie bedroom artist / professional sad boi",
    link: "https://www.instagram.com/nuclear.instruments",
  },
  {
    id: 2,
    username: "stillness.archives",
    email: "stillness@archive.co.uk",
    password: bcrypt.hashSync("password123", 6),
  },
  {
    id: 3,
    username: "selection.kitchen",
    email: "selection@kitchen.com",
    password: bcrypt.hashSync("password123", 6),
  },
  {
    id: 4,
    username: "user example",
    email: "user@example.com",
    password: bcrypt.hashSync("password123", 6),
  },
];
