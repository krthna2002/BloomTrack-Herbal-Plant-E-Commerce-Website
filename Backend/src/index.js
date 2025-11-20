const PORT = process.env.PORT || 3003
const app = require('./app')
require('dotenv').config({ path: './config/dev.env' });
app.listen(PORT, ()=>{
    console.log("server running at port "+PORT)
})
