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
        
        if(ingredientes.length < 3){
            return res.status(400).json({error: "Minímo de 3 ingredientes"});
        }

        if(preco < 10){
            return res.status(400).json({error: "Preço abaixo do minímo"});
        }

        const prod = await Produto.create({
            nome : nomeProduto,
            preco,
            ingredientes
        })

        return res.json(prod);
    },

    async update(req, res){
        const { preco , nome : nomeProduto , ingredientes } = req.body;
        const { prodID } = req.params;

        const prod = await Produto.findById(prodID);

        const prodExists = await Produto.findOne({nome : nomeProduto});

        if(prodExists){
            return res.status(400).json({error: "Já existe um produto com esse nome"});
        }

        if(!prod){
            return res.status(400).json({error: "Produto não existe"});
        }

        if(ingredientes.length < 3){
            return res.status(400).json({error: "Minímo de 3 ingredientes"});
        }

        prod.preco = preco;
        prod.nome = nomeProduto;
        prod.ingredientes = ingredientes;

        await prod.save()

        return res.json(prod);
    },

    async somaPreco(req, res){
        const produtos = await Produto.find({});
        total = 0;
        for(index=0; index < produtos.length; index++){
           total += produtos[index].preco;
        }
        return res.json({"Soma" : total});
    }

}