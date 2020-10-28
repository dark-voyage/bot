const { composer, middleware } = require('../../core/bot')

const consoles = require('../../layouts/consoles')
const message = require('../../layouts/messages')
const keyboard = require('../../layouts/keyboards')
const ds = require('../../database/ds')
const env = require('../../core/env')

composer.command(`minecraft`, async ctx => {
    await ctx.replyWithAnimation({url: `https://media.giphy.com/media/3o6UB7BJ9cguaRm0cU/source.gif`}, {
        parse_mode: "HTML",
        caption: `<b>Please, wait a minute. We are processing your request!</b>`
    })

    const database = await ds(env.MINECRAFT)
    if (database === null || database["debug"].ping === false) {
        await ctx.replyWithAnimation({url: `https://media.giphy.com/media/3o6UBedJJfaxXHvZyU/source.gif`}, {
            caption: `<b>Unavailable at the moment! Please, try again later...</b>`,
            parse_mode: "HTML",
            reply_markup: keyboard.minecraft
        })
    } else {
        await ctx.replyWithAnimation({url: `https://media.giphy.com/media/3o6UBedJJfaxXHvZyU/source.gif`}, {
            reply_markup: keyboard.minecraft,
            parse_mode: "HTML",
            caption: message.minecraft(database)
        })
    }
})

composer.command(`auth`, async ctx => {
    await ctx.replyWithHTML(message.minecraft_account, {
            reply_markup: keyboard.minecraft_account
        })
})

middleware(composer)
consoles.module(__filename)
