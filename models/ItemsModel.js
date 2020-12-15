const filename = '../data/items.json'
const filePath = __dirname + `/${filename}`
let items = require('../data/items.json')
const ItemUtils = require('../utils/item.utils')
const ResponseUtils = require('../utils/response.utils')

/**
 * Returns list of items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {

        //items is fetched from file required above
        if (items.length === 0) {
            return ResponseUtils.success(res, [])
        }

        return ResponseUtils.success(res, items)

    } catch (error) {
        return ResponseUtils.error(res, error)
    }
}

/**
 * Creates items
 * @param {Array<Object>} req - req.body
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        //currently used this ,it would be passed from frontent
        //as Array<Object>
        let itemData = [req.body]

        //for multiple rows added at same time
        itemData.map(i => {
            i.id = ItemUtils.getNewId(items)
            items.push(i)
            ItemUtils.writeJSONFile(filePath, items)
        })

        return ResponseUtils.success(res, items);

    } catch (error) {
        console.log('error', error)
        return ResponseUtils.error(res, error)
    }
}

module.exports = {
    getItems,
    createItem
}