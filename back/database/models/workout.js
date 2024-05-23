module.exports = (sequelize, DataTypes) => {
    const alias = 'Entrenamiento';
    const cols = {
        id_entrenamiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        frecuencia: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        tableName: 'Entrenamientos',
        timestamps: false
    };

    const Entrenamiento = sequelize.define(alias, cols, config);

    Entrenamiento.associate = function(models) {
        Entrenamiento.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        });
        Entrenamiento.hasMany(models.Ejercicio, {
            foreignKey: 'id_entrenamiento',
            as: 'ejercicios'
        });
    };

    return Entrenamiento;
};
