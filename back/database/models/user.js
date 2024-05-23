module.exports = (sequelize, DataTypes) => {
    const alias = 'Usuario';
    const cols = {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'cliente'
        }
    };
    const config = {
        tableName: 'Usuarios',
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Dieta, {
            foreignKey: 'id_usuario',
            as: 'dietas'
        });
        Usuario.hasMany(models.Entrenamiento, {
            foreignKey: 'id_usuario',
            as: 'entrenamientos'
        });
    };

    return Usuario;
};
