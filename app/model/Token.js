'use strict';

module.exports = UserModel;

function UserModel(db, DataTypes) {
    return db.define('Token', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            defaultValue: 'active',
            values: ['active', 'deleted', 'inactive', 'expired', 'used']
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
