const Item = require('../models/ItemsModel.js');

module.exports = (router) => {

    router.get('/', Item.getItems);

    router.post('/add-items', Item.createItem);

};
