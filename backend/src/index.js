import express from 'express'
import cors from 'cors'

// função de inicialização da aplicação

async function Main() {
    const hostname = "localhost"
    const port = "3000"
    // define o app para uma instancia do express
    const app = express()
    // parse pra json da resposta do servidor
    app.use(express.json()) 
    app.use(cors())
    
    app.get('/',(req, res) => {
        res.send({
            success:true,
            statusCode: 200,
            body: "Welcome to Aroma Gastronomia"
        })
    })
    app.listen(port, () => {
        console.log(`Server running on: https://${hostname}:${port}`)
    })
}

Main()