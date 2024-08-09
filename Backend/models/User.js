import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'username', 'email', 'password'],

      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        isDeleted: { type: 'boolean', default: false },
        profileImage: { type: ['string', 'null'], maxLength: 255 },
        following: { type: ['array', 'null'], items: { type: 'string', format: 'uuid' } },
        followers: { type: ['array', 'null'], items: { type: 'string', format: 'uuid' } },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      }
    };
  }

  $beforeInsert() {
    this.id = uuidv4();
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default User;
