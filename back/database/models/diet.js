module.exports = (sequelize, DataTypes) => {
    const alias = 'Dieta';
    const cols = {
        id_dieta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
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
        tableName: 'Dietas',
        timestamps: false
    };

    const Dieta = sequelize.define(alias, cols, config);

    Dieta.associate = function(models) {
        Dieta.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        });
        Dieta.hasMany(models.Comida, {
            foreignKey: 'id_dieta',
            as: 'comidas'
        });
    };

    return Dieta;
};
