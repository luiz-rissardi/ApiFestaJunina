
const StockEntity = {
    //field : type of Field
    productId:{
        type:"number",
        minLength:1
    },
    productName: {
        type:"string",
        minLength:4
    },
    price: {
        type:"number",
        minLength:1
    },
    quantity: {
        type:"number",
        minLength:1
    },
    active: {
        type:"number",
        minLength:1
    },
    productChosen:{
        type:"boolean",
        minLength:1
    }
}

const UsersEntity = {
    //field : type of Field
    userName:{
        type:"string",
        minLength:4
    },
    password:{
        type:"string",
        minLength:4
    },
    productIdAnexed:{
        type:"number",
        minLength:1
    },
    passwordHash:{
        type:"string",
        minLength:"128"
    }
}

const shoppingEntity = {
    //field : type of Field
    dateOfSale:{
        type:"Date",
        minLength:10
    },
    saleId:{
        type:"number",
        minLength:1
    }
}

const productSalesEntity = {
    //field : type of Field
    saleId:{
        type:"number",
        minLength:1
    },
    productId:{
        type:"number",
        minLength:1
    },
    totalQuantity:{
        type:"number",
        minLength:1
    },
    ...StockEntity
}

export {
    StockEntity,
    UsersEntity,
    shoppingEntity,
    productSalesEntity
}


