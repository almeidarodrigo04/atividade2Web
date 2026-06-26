import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

const Potion = sequelize.define("Potion", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const seedPotions = [
  {
    name: "Poção Blue Sky",
    description:
      "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
    image: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
    price: 300,
  },
  {
    name: "Poção do Perfume Misterioso",
    description:
      "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
    image: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
    price: 200,
  },
  {
    name: "Poção de Pinus",
    description:
      "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
    image: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
    price: 3000,
  },
  {
    name: "Poção da Beleza Eterna",
    description: "Veneno que mata rápido.",
    image: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
    price: 100,
  },
  {
    name: "Poção do Arco Íris",
    description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.",
    image: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
    price: 120,
  },
  {
    name: "Caldeirão das Verdades Secretas",
    description: "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
    image: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
    price: 150,
  },
  {
    name: "Biscoito do Abismo",
    description: "Serve uma deliciosa refeição para o seu Pet.",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/d/d0/Poritos_item.png/revision/latest?cb=20240208233817&path-prefix=pt-br",
    price: 35,
  },
  {
    name: "Essência do Oráculo",
    description: "As visões podem não lhe agradar, não nos repsonsabilizamos",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/4/47/Ess%C3%AAncia_do_Or%C3%A1culo_item.png/revision/latest?cb=20131215223702&path-prefix=pt-br",
    price: 250,
  },
  {
    name: "Elixir da Ira",
    description: "Não esteja por perto quando alguém bebê-la",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/e/e1/Elixir_da_Ira_item.png/revision/latest?cb=20240208204635&path-prefix=pt-br",
    price: 400,
  },
];

export const initDatabase = async () => {
  await sequelize.sync({ force: true });
  await Potion.bulkCreate(seedPotions);
  console.log("Database initialized and seeded.");
};

export { Potion };
