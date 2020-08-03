import { Request, Response } from 'express';
import knex from '../database/connection';
import { convertStringToArray } from '../utils/ConvertStringToArray';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const parsedItems = convertStringToArray(String(items));

        console.log({ city, uf, items }, parsedItems);

        try {
            const points = await knex('points')
                .join('point_items', 'points.id', '=', 'point_items.point_id')
                .whereIn('point_items.item_id', parsedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('*');

            const serializedPoints = points.map(point => {
                return {
                    ...points,
                    image_url: `http://localhost:3333/images/uploads/${point.image}`,
                };
            });
            return response.json(serializedPoints);
        } catch (error) {
            return response.json({});
        };
    };
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not Fonund!' })
        };

        const serializedPoint = {
            ...point,
            image_url: `http://localhost:3333/images/uploads/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    };
    async create(request: Request, response: Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
        const point = { image: request.file.filename, name, email, whatsapp, latitude, longitude, city, uf };

        try {
            const trx = await knex.transaction();

            const [point_id] = await trx('points').insert(point);

            const point_items = convertStringToArray(String(items))
                .map((item_id: number) => {
                    return { item_id, point_id, };
                });

            await trx('point_items').insert(point_items);

            await trx.commit();

            return response.status(201).json({ id: point_id, ...point, items });
        } catch (error) {
            return response.json({ error });
        };
    };
};

export { PointsController };