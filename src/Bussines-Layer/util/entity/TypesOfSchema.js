
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
        minLength:2
    },
    quantity: {
        type:"number",
        minLength:1
    },
    active: {
        type:"boolean",
        minLength:1
    },
}

const UsersEntity = {
    //field : type of Field
    userId:{
        type:"number",
        minLength:1
    },
    userName:{
        type:"string",
        minLength:4
    },
    passwordHash:{
        type:"string",
        minLength:128
    },
    hashCodeUser:{
        type:"number",
        minLength:128
    },
}

const shoppingEntity = {
    //field : type of Field
    dateOfSale:{
        type:"Date",
        minLength:10
    },
    price:{
        type:"number",
        minLength:1
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


