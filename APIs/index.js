const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const elasticsearch = require('elasticsearch')

const app = express();
const PORT = 3000
const indexName = 'tweets'

// create connction with elasticSearch
const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

// to unblock requests from http://localhost:4200 (user interface)
let corsOptions = {

    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

// to add and control body in the request
app.use(bodyParser.json())

// specify the port which the server works on 
app.listen(PORT, () =>{
    console.log(`server started in port ${PORT}`)
})


app.get('/api/v1/get/qurey/:lon/:lat', async (req, res) => {

    
    console.log(req.params.lon)
    console.log(req.params.lat)
    console.log(req.body)
    
  const searchResult = await client.search({index: indexName, body: {

    size:10000,
    query:{
        bool:{
            must:{
                match_all: {}
            },
            filter: {
             geo_distance: {
                  distance: "5000km",
                  coordinates:{
                      lat: req.params.lat,
                      lon: req.params.lon
                   }
           }
        }
        }
    }
}})

  res.status(200).json(searchResult.hits.hits)
})
