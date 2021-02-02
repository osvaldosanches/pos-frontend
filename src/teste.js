const axios = require('axios')

axios
  .post('http://hml.portalgeprosro.brasilseg.com.br/api/cargas/cargarInserir/risco_emissao', {
    todo: 'Buy the milk'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })