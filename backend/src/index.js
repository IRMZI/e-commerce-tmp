import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import productsRouter from './routes/products.js'
config()

// função de inicialização da aplicação
async function Main() {
    const hostname = "localhost"
    const port = "3000"
    // define o app para uma instancia do express
    const app = express()
    // Cria conexão com o banco de dados utilizando variáveis de ambiente 
    const mongoConnection = await Mongo.connect({ mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME})
    console.log(mongoConnection)
    // parse pra json da resposta do servidor
    app.use(express.json()) 
    app.use(cors())
    app.get('/',(req, res) => {
        res.send({
            success:true,
            statusCode: 200,
            body: "Welcome to Cogumelos campestre"
        })
    })
    // Utiliza a rota "/auth" 
    app.use('/auth', authRouter)
    // Utiliza a rota "/Users"  
    app.use('/users', usersRouter)
    // Utiliza a rota "/Users"  
    app.use('/products', productsRouter)
    app.listen(port, () => {
        console.log(`Server running on: https://${hostname}:${port}`)
    })
}

Main()