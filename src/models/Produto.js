const {Schema , model} = require('mongoose');

const ProdutoSchema = new Schema({
    nome : {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        min: 10
    },
    ingredientes: [{
        type: String,
        required: true
    }]
});

module.exports = model('Produto' , ProdutoSchema);