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

let freq_agg;

app.post('/api/v1/get/qurey/', async (req, res) => {

    
   
    console.log(req.body)
    
  const searchResult = await client.search({index: indexName, body: {

    "size":10000,
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_bounding_box" : {
                    "coordinates" : {
                        "top_left": {
                            "lat": req.body.top_left.lat,
                            "lon":req.body.top_left.lng
                          },
                          "bottom_right": {
                            "lat": req.body.bottom_right.lat,
                            "lon": req.body.bottom_right.lng
                          } 
                    }
                }
            }
        }
    },
    "aggs" : {
        "freq_agg" : {
            "terms": {
                "field" : "text",
                "size": 150,
                "min_doc_count": 60
            }
      }
    }
}})

 

  res.status(200).json([searchResult.aggregations.freq_agg.buckets, searchResult.hits.hits])
})