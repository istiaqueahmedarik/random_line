const app = require('express')();
const axios = require('axios');
const res = require('express/lib/response');
const PORT = 3030;

app.get('/',(req,res)=>{
    console.log('hello');
    res.send(`<h1>Hello</h1>`);

})
app.get('/line',(req,res)=>{
    axios.get(`https://api.quotable.io/random?minLength=200&maxLength=300`)
    .then(function (response) {
          // handle success
          
          let line = response.data.content
          res.status(200).send({ data: line })
          

         
    })
    .catch(function (error) {
          // handle error
        console.log(error);
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
