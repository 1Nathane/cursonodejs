const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Procure por cotações',
        author: 'Nathane Miranda'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre dinamico',
        author: 'Nathane Miranda'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda dinamico',
        author: 'Nathane Miranda'
    })
})

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                message: 'O ativo deve ser informado como query parameter',
                code: 400 
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes.cotacao(symbol, (err, body) => {
        if(err){
            res.status(err.code).json({error: {
                message: err.message,
                code: err.code
            }})                         
        }
        console.log(body)
        res.status(200).json(body)
    })

    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        mensager: 'Página não encontrada!!!',
        author: 'Nathane Miranda'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})