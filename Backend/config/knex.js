import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
// Initialize Knex.
const knex = Knex(knexConfig.development);

Model.knex(knex);

export default knex;