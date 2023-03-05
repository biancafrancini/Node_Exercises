const {Pool} = require("node-postgres");
const pool = new Pool({
    host: "localhost",
    user: "biancafrancini",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    port: 5432,
    database: "biancafrancini",
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
   
  // async/await - check out a client
  const query = async(text, params) =>{
    const client = await pool.connect()
    try {
      return await client.query(text, params);
    } catch (err) {
      throw err; 
    } finally {
      client.release()
    }
  }

  module.exports= {query};