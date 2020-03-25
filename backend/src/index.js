const express = require('express');
const cors = require('cors');
const routes=require('./routes')

const app= express();
app.use(cors())
app.use(express.json());
/**
 * GET
 * PUT
 * DELETE
 * PUT
 * 
 */

 /**
  * Query Params
  * Route Params
  * Request Body
  */

  /**
   * SQL: mysql, sqlite, postgres, oracle
   * nosql: mongodb, couchdb, etc
   * 
   */

   /**
    * driver: sleect * from users
    * Query BUilder: table('users').select('*')
    * Knex
    */

app.use(routes)
app.listen(3333);