require('dotenv').config();
const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;

//the pool class allows you to connect to the supabase
const pool = new Pool({
  //this is what makes the connection
  connectionString: PG_URI,
});

//we are exporting an object that contains a property called query and its a function
//that returns and invocation of pool.query()
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
