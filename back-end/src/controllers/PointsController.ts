import { Request, Response } from 'express';
import knex from '../database/connection';
import parseStringToArray from '../utils/ParseStringToArray';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = parseStringToArray(String(items));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('*');

        return response.json(points);
    };
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not Fonund!' })
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    };
    async create(request: Request, response: Response) {
        const { image, name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
        const point = { image, name, email, whatsapp, latitude, longitude, city, uf };

        const trx = await knex.transaction();

        const [point_id] = await trx('points').insert(point);

        const point_items = items.map((item_id: number) => {
            return {
                point_id,
                item_id
            };
        });

        await trx('point_items').insert(point_items);

        await trx.commit();

        return response.json({ id: point_id, ...point, items });
    };
};

export default PointsController;