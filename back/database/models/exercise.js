module.exports = (sequelize, DataTypes) => {
    const alias = 'Ejercicio';
    const cols = {
        id_ejercicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_entrenamiento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        repeticiones: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        series: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descanso: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    const config = {
        tableName: 'Ejercicios',
        timestamps: false
    };

    const Ejercicio = sequelize.define(alias, cols, config);

    Ejercicio.associate = function(models) {
        Ejercicio.belongsTo(models.Entrenamiento, {
            foreignKey: 'id_entrenamiento',
            as: 'entrenamiento'
        });
    };

    return Ejercicio;
};
