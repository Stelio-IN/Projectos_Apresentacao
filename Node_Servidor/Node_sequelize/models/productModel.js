export default (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",{
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.FLOAT,
        },
        description:{
            type: DataTypes.TEXT,
        },
        published:{
            type: DataTypes.BOOLEAN,
        }
    })
    return Product;
}