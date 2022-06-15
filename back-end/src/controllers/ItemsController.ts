import { Request, Response } from "express";
import { connection as Knex } from "../database/connection";
import { serializeItemImage } from "../utils/serializeImage";

class ItemsController {
  async index(request: Request, response: Response) {
    try {
      const items = await Knex("items").select("*");

      const serializedItems = items.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image_url: serializeItemImage(String(item.image)),
        };
      });

      return response.json(serializedItems);
    } catch (error) {
      return response.json({});
    }
  }
}

export { ItemsController };
