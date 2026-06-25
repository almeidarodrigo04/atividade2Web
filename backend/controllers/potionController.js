import { Potion } from "../models/database.js";

export const getAllPotions = async (req, res) => {
  try {
    const potions = await Potion.findAll();
    res.json(potions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch potions." });
  }
};

export const createPotion = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;

    if (!name || !description || !image || price === undefined) {
      return res.status(400).json({ error: "All fields are required: name, description, image, price." });
    }

    const potion = await Potion.create({ name, description, image, price });
    res.status(201).json(potion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create potion." });
  }
};

export const deletePotion = async (req, res) => {
  try {
    const { id } = req.params;
    const potion = await Potion.findByPk(id);

    if (!potion) {
      return res.status(404).json({ error: "Potion not found." });
    }

    await potion.destroy();
    res.json({ message: "Potion deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete potion." });
  }
};
