const { composer, middleware } = require('../../core/bot')

const consoles = require('../../layouts/consoles')
const message = require('../../layouts/messages')
const keyboard = require('../../layouts/keyboards')
const database = require('../../database/db')

composer.command(`admins`, async ctx => {
    const admins = Object.keys(database.admins)

    await ctx.replyWithAnimation({url: 'https://media.giphy.com/media/xT77XUw1XMVGIxgove/source.gif'}, {
        parse_mode: "HTML",
        caption: message.admin_menu,
        reply_markup: await keyboard.admin_list(admins)
    })
})

middleware(composer)
consoles.module(__filename)
