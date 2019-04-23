const {Client} = require('cassandra-driver')
const CASSANDRA_CONTACT_POINTS = process.env['CASSANDRA_CONTACT_POINTS'].split(
  ','
)

const LOCAL_DATA_CENTER = process.env['LOCAL_DATA_CENTER']

const cassandraClient = (() => {
  let client

  const init = keyspace => {
    return new Client({
      contactPoints: CASSANDRA_CONTACT_POINTS,
      localDataCenter: LOCAL_DATA_CENTER,
      keyspace,
      queryOptions: {
        prepare: true,
      },
    })
  }

  return {
    createClient: keyspace => {
      if (!client) {
        client = init(keyspace)
      }
      return client
    },
  }
})()

module.exports = cassandraClient
