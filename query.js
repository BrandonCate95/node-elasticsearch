const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    cloud: {
      id: 'AenoicTest1:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyQzOWI3ZmVhYzVhYjM0ZmZjYTlmZjg0ZGUyODYyZDZjYSQ0OWYwN2Y4YWQ0NmI0MjU0YTYyMzI3NWYzOTllMTJiMQ==',
      username: 'elastic',
      password: 'PnD3KsDvjQUnCv4eg2MgvkJI'
    }
  })

query = async () => {
    try {
        const now = Date.now()
        const result = await client.search({
            index: 'customer',
            body: { 
              "query": {
                "match_all": {}
              }  
            }
          })
        console.log("Query time: " + (Date.now() - now))
        console.log("*********** result ****************")
        console.log(result.body.hits.hits)
        client.close()
    } catch (err) {
        console.log("*********** error ****************")
        console.error(err);
    }
}

query()