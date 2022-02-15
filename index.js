const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { response } = require('express')

const app = express()
const newspaper = [
    {
        name: 'thetimes',
        address: 'https://time.com/tag/climate-change/'
    },
    {
        name: 'gaurdian',
        address: 'https://www.theguardian.com/environment/climate-crisis'
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/global-health/climate-and-people/'
    },

]

const articles = []

newspaper.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) =>{
        const html = response.data
        //  console.log(html)
        const $ = cheerio.load(html)

        $('a:contains("climate")',html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url,
                source : newspaper.name
            })


        }) 
        //res.json(articles)



    }).catch((err) => console.log(err))
})

app.get('/news' , (req,res) =>{
   res.json(articles)
})

app.listen(PORT , () => console.log(`server running on port  ${PORT}`))
