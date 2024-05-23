module.exports = (sequelize, DataTypes) => {
    const alias = 'Comida';
    const cols = {
        id_comida: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_dieta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calorias: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        proteinas: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        carbohidratos: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        grasas: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    };
    const config = {
        tableName: 'Comidas',
        timestamps: false
    };

    const Comida = sequelize.define(alias, cols, config);

    Comida.associate = function(models) {
        Comida.belongsTo(models.Dieta, {
            foreignKey: 'id_dieta',
            as: 'dieta'
        });
    };

    return Comida;
};
