const express = require('express')
const elasticsearch = require('elasticsearch')

const app = express();
const PORT = 3000
const indexName = 'tweets'

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

app.listen(PORT, () =>{
    console.log(`server started in port ${PORT}`)
})


app.get('/api/get/qurey', async (req, res) => {

    let body = {
        size: 4,
        from: 0,
        query: {
            match: {
                text: 'the',
            }
        }
   }

  const searchResult = await client.search({index: indexName, body: body})

  console.log(searchResult.hits.hits[0])

 res.status(200).send(searchResult.hits.hits)
   
})
