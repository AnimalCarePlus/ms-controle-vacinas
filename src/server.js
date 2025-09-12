require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authMiddleware = require('./middlewares/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const vaccineRoutes = require('./routes/vaccineRoutes');
const stockRoutes = require('./routes/stockRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const responseHandler = require('./middlewares/responseHandler')
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use(responseHandler);

app.get('/health',(req,res)=>res.json({status:'ok'}));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use('/api/vaccines',authMiddleware,vaccineRoutes);
app.use('/api/stock',authMiddleware,stockRoutes);
app.use('/api/applications',authMiddleware,applicationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
connectDB().then(()=>app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`)));
