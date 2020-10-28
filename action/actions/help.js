const { composer, middleware } = require('../../core/bot')

const consoles = require('../../layouts/consoles')
const message = require('../../layouts/messages')
const keyboard = require('../../layouts/keyboards')

composer.action(`help`, async ctx => {
    await ctx.editMessageMedia({type: 'animation', media: `https://media.giphy.com/media/j2dYUL6ONL1TEuwDFP/source.gif`, caption: message.help}, {
        parse_mode: "HTML",
        reply_markup: keyboard.help
    })
})

middleware(composer)
consoles.module(__filename)
