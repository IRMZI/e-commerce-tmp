import { MongoClient } from 'mongodb'

export const Mongo = {
    // cria função para conexão com o mongo, 
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            // cria o client do mongoDb recebendo um caminho
            const client = new MongoClient(mongoConnectionString)

            await client.connect()
            // define o banco de dados
            const db = client.db(mongoDbName)

            this.client = client
            this.db = db 

            return 'connected to mongo'
        } catch (error) {
            return {  text: "Error during mongo connection - Erro durante conexão com o mongo"}
        }
        
    }
}