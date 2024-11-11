import express from 'express'
import passport from 'passport'
import localStrategy from "passport-local"
import crypto from 'crypto'
import { Mongo } from '../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'


// Nome da coleção onde os usuários são armazenados
const collectionName = 'users'

passport.use(new localStrategy(
    // Define o campo de login como 'email'
    { usernameField: 'email'}, 
    // Função de verificação de usuário
    async(email, password, callback) => {
     // Busca um documento na coleção 'users' onde o campo 'email' seja igual ao fornecido
    const user = await Mongo.db
    .collection(collectionName)
    .findOne({ email: email})

    if(!user){
        return callback(null, false)
    }

    // Recupera o salt armazenado no usuário para verificar a senha
    const saltBuffer = user.salt.buffer 

    // Gera o hash da senha fornecida usando o salt armazenado
    crypto.pbkdf2(password, saltBuffer, 310000, 16,'sha256', (err, hashedPassword) => {
        if(err) {
            return callback(null, false)
        }
        // Converte a senha armazenada no banco para buffer
        const userPasswordBuffer = Buffer.from(user.password.buffer)

        // Compara o hash da senha fornecida com o hash armazenado usando comparação segura
        if(!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false)
        }
        // Remove o password e salt dos dados do usuário antes de retornar
        const { password, salt, ...rest } = user  
        return callback(null, rest) // Autenticação bem-sucedida, retorna o usuário
    })
}))

// Cria o roteador de autenticação para gerenciar rotas de login e cadastro
const authRouter = express.Router()

// Rota de cadastro
authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
    .collection(collectionName)
    .findOne({ email: req.body.email })

    if(checkUser) { 
        return res.status(500).send({
            success: false,
            statusCode: 500,
            body: {
                text: "User already exists / usuário ja existente"
            }
        })
    }
    // Gera um salt aleatório para o novo usuário
    const salt = crypto.randomBytes(16)

    // Gera o hash da senha com o salt criado
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async(err, hashedPassword) => {
        if(err) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: "Error on cryto password / erro na encryptação da senha",
                    err: err
                }
            })  
        }
        // Insere o novo usuário no banco de dados com email, senha criptografada e salt
        const result = await Mongo.db
        .collection(collectionName)
        .insertOne({
            email: req.body.email,
            password: hashedPassword,
            salt
        })
        // Verifica se o usuário foi inserido com sucesso
        if(result.insertedId){
            // Busca o novo usuário para retornar com o token JWT
            const user = await Mongo.db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(result.insertedId) })
            // Cria um token JWT com as informações do usuário
            const token = jwt.sign(user, 'secret')

            return res.send({
                success: true,
                statusCode: 200,
                body: {
                text: "User registered / Usuário registrado",
                token,
                user,
                logged: true
            }
            })
        }
    } )
})

// Rota de login 
authRouter.post('/login', (req, res) => {
    // Define que vai utilizar a estratégia local para authenticar
    passport.authenticate('local', (error, user) =>{
        // Erro de authenticação
        if(error){
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: "Error during login authentication / Erro durante a authenticação de login",
                    error
                }
            })
        }
        // Erro de usuário não existente
        if(!user){
            return res.status(400).send({
                success: false,
                statusCode: 400,
                body: {
                    text: "Credentials uncorrect / credenciais incorretas ",
                }
            })
        }
        // Define o token e retorna o usuário logado
        const token = jwt.sign(user, 'secret')
        return res.status(200).send({
            success: true,
            statusCode: 200,
            body: {
                text: "User logged in / usuário logado ",
                user,
                token
            }
        })
    })(req, res)
})


export default authRouter