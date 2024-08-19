import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Note extends Model {
    id?: number;
    title?: string;
    content?: string;
}

export const NoteModel = (sequelize: Sequelize) => {
    Note.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT
        },
        content: {
            type: DataTypes.TEXT
        }
    }, { sequelize, tableName: 'Notes', timestamps: false });
};