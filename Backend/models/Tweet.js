import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import User from './User.js';

class Tweet extends Model {
  static get tableName() {
    return 'tweets';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['caption', 'imgNames', 'userId'],

      properties: {
        id: { type: 'string', format: 'uuid' },
        caption: { type: 'string', minLength: 1 },
        imgNames: { type: 'array', items: { type: 'string' } },
        isDeleted: { type: 'boolean', default: false },
        userId: { type: 'string', format: 'uuid' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
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

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tweets.userId',
          to: 'users.id'
        }
      }
    };
  }
}

export default Tweet;
