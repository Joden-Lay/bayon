'use strict';

module.exports = UserModel;

function UserModel(db, DataTypes) {
    return db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        hash: {
            type: DataTypes.STRING,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        accessKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isPwdChangeRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            defaultValue: 'user',
            values: ['admin', 'user'],
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            defaultValue: 'pending',
            values: ['active', 'pending', 'deleted', 'banned', 'inactive', 'deactive']
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        classMethods: {
            findByAccessKey: function * (accessKey) {
                return yield bayon.model.find({
                    where: {
                        accessKey: accessKey
                    }
                });
            }
        }
    });
}
