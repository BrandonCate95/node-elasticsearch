const express = require('express')
const { Client } = require('@elastic/elasticsearch')

const PORT = process.env.PORT || 5000

const client = new Client({
    cloud: {
      id: 'AenoicTest1:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyQzOWI3ZmVhYzVhYjM0ZmZjYTlmZjg0ZGUyODYyZDZjYSQ0OWYwN2Y4YWQ0NmI0MjU0YTYyMzI3NWYzOTllMTJiMQ==',
      username: 'elastic',
      password: 'PnD3KsDvjQUnCv4eg2MgvkJI'
    }
  })

express()
  .get('/', async (req, res) => {
    try {
        const now = Date.now()
        const result = await client.search({
            index: 'bank',
            body: {
              "query": { "match_all": {} },
              "sort": { "balance": { "order": "desc" } }
            }
          })
        console.log("Query time: " + (Date.now() - now))
        console.log("*********** result ****************")
        console.log(result.body.hits.hits)
        res.send(result.body.hits.hits);
        //client.close()
    } catch (err) {
        console.log("*********** error ****************")
        console.error(err);
        res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// query = async () => {
//     try {
//         const now = Date.now()
//         const result = await client.search({
//             index: 'customer',
//             body: { 
//               "query": {
//                 "match_all": {}
//               }  
//             }
//           })
//         console.log("Query time: " + (Date.now() - now))
//         console.log("*********** result ****************")
//         console.log(result.body.hits.hits)
//         // res.render('pages/db', results );
//         client.close()
//     } catch (err) {
//         console.log("*********** error ****************")
//         console.error(err);
//         //res.send("Error " + err);
//     }
// }

// query()