// TODO 监听3000端口，便于执行test

import express from 'express'
import { createAPP } from './app.js'
import {renderToString} from 'vue/server-renderer'

const server = express()

server.get('/', (req,res) => {
    const app = createAPP()
    
    renderToString(app).then(html => {
        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Vue SSR Example</title>
            <script type="importmap">
                {
                    "imports": {
                    "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
                    }
                }
            </script>
            <script type="module" src="/client.js"></script>
        </head>
        <body>
            <div id="app">${html}</div>
        </body>
        </html>
        `)
    })
})

server.use(express.static('.'))

server.listen(3000, () => {
    console.log('ready')
})
