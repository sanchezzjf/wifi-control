import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { logger } from './util/logger.js'
import ejs from 'ejs'
import { frontRouter } from './routers/frontRouter.js';
import cookieParser from 'cookie-parser';


const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFiles = resolve(__dirname, '../', 'public')

const PORT = 9000 || process.env.PORT

app.engine('.html', ejs.__express);
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(staticFiles))
app.set('views', resolve(__dirname, 'views'))
app.set('view engine', 'html');

app.use('/', frontRouter)

/* const startServer = () => {
    const { address, port } = server.address()
    const protocol = 'http'
    logger.info(`App started at ${protocol}://${address}:${port}`)
} */

app.listen(PORT, () => {
    logger.info(`INDEX: App started on ${PORT}`)
})                                       