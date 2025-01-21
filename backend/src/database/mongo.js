import { MongoClient } from 'mongodb';
import { debug, info, error } from "../helpers/logger.js"; // Import logger

export const Mongo = {
    db: null,
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            debug('Connecting to MongoDB');
            const client = new MongoClient(mongoConnectionString);

            await client.connect();
            info('Connected to MongoDB');
            const db = client.db(mongoDbName);

            this.client = client;
            this.db = db;

            return 'connected to mongo';
        } catch (err) {
            error(`Error connecting to MongoDB: ${err.message}`);
            return { text: "Error during mongo connection - Erro durante conexão com o mongo", error: err };
        }
    }
};