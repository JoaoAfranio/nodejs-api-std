const Produto = require('../models/Produto');

module.exports = {
    async index(req, res){
        const produtos = await Produto.find({});
        return res.json(produtos);
    },

    async show(req, res){
        const { prodID } = req.params;
        const produto = await Produto.findById(prodID);
        return res.json(produto);
    },

    async store(req, res){
        const { preco, nome : nomeProduto, ingredientes} = req.body;

        const prodExists = await Produto.findOne({nome : nomeProduto});

        
        if(prodExists){
          return res.json(prodExists);
        }
        

        const prod = await Produto.create({
            nome : nomeProduto,
            preco,
            ingredientes
        })

        return res.json(prod);
    },

    async update(req, res){
        const { preco , nome , ingredientes } = req.body;
        const { prodID } = req.params;



        const prod = await Produto.findById(prodID);

        if(!prod){
            return res.status(400).json({error: "Produto não existe"});
        }

        prod.ingredientes.push(ingredientes);

        console.log(prod.ingredientes);
        
        prod.preco = preco;
        prod.nome = nome;

        await prod.save()

        return res.json(prod);
    }

}