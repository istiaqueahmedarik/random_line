const app = require('express')();
const axios = require('axios');
const res = require('express/lib/response');
const PORT = 3030;

app.get('/',(req,res)=>{
    console.log('hello');
    res.send(`<h1>Hello</h1>`);

})
app.get('/line',(req,res)=>{
    axios.get(`https://type.fit/api/quotes`)
    .then(function (response) {
          // handle success
          random_index = Math.floor(Math.random()*(response.data.length-1+1)+1)
          let line = response.data[random_index].text
          axios.request(
            {
                method: 'POST',
                url: 'https://api.eleuther.ai/completion',    
                data: {
                  context: line,
                  top_p: 0.9,
                  temp: 0.8,
                  response_length: 25,
                  remove_input: true
                }
              }
          ).then(function (response) {
            
            res.status(200).send({ data: line+response.data[0].generated_text })

          }).catch(function (error) {
            console.error(error);
          });


         
    })
    .catch(function (error) {
          // handle error
        console.log(error);
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
