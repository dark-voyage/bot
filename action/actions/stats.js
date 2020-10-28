const { composer, middleware } = require("../../core/bot");
const { Markup } = require("telegraf");
const axios = require("axios");
const env = require("../../../apps/config/env.config");

const consoles = require("../../layouts/consoles");
const database = require("../../database/db");
const baseUrl = env.DATABASE + `/subscriber/`;

const statusChecker = async (people) => {
  return await axios.get(baseUrl + people).then((res) => {
    return res.data.registered;
  });
};

const text = async (people) => {
  if (await statusChecker(people)) {
    return `subscribed`;
  } else {
    return `unsubscribed`;
  }
};

const create = async (people) => {
  return await axios
    .post(baseUrl, {
      id: people,
    })
    .then((res) => {
      return res.data;
    });
};

const remove = async (people) => {
  return await axios.delete(baseUrl + people).then((res) => {
    return res.data;
  });
};

composer.action(`stats`, async (ctx) => {
  const uptime = await new Date().toLocaleString();

  const subscriber = ctx.from.id;
  const status = {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
    lang: ctx.from.language_code,
    superuser: async () => {
      if (
        database.users["eternal"].includes(ctx.from.id) ||
        database.users["temporary"].includes(ctx.from.username)
      ) {
        return `admin`;
      } else {
        return `non-admin`;
      }
    },
  };

  const keyboard = async () => {
    if (await statusChecker(subscriber)) {
      return Markup.inlineKeyboard([
        [Markup.callbackButton(`Unsubscribe from feed!`, `unsubscribe`)],
        [Markup.callbackButton(`Refresh the page`, `stats`)],
      ]);
    } else {
      return Markup.inlineKeyboard([
        [Markup.callbackButton(`Subscribe for feed!`, `subscribe`)],
        [Markup.callbackButton(`Refresh the page`, `stats`)],
      ]);
    }
  };

  await ctx.editMessageCaption(
    `<b>User status preview:</b>` +
      `\n` +
      `\n` +
      `<b>ID:</b> <code>${status.id}</code>` +
      `\n` +
      `<b>First Name:</b> <code>${status.first_name}</code>` +
      `\n` +
      `<b>Last Name:</b> <code>${status.last_name}</code>` +
      `\n` +
      `<b>Username:</b> <code>${status.username}</code>` +
      `\n` +
      `<b>Language:</b> <code>${status.lang}</code>` +
      `\n` +
      `<b>Status:</b> <code>${await status.superuser()}</code>` +
      `\n` +
      `<b>Feeds:</b> <code>${await text(subscriber)}</code>` +
      `\n` +
      `\n` +
      `<b>Last Update:</b> <code>${uptime}</code>`,
    {
      parse_mode: "HTML",
      reply_markup: await keyboard(subscriber),
    }
  );
});

composer.action(`subscribe`, async (ctx) => {
  const uptime = await new Date().toLocaleString();

  const subscriber = ctx.from.id;
  const status = {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
    lang: ctx.from.language_code,
    superuser: async () => {
      if (
        database.users["eternal"].includes(ctx.from.id) ||
        database.users["temporary"].includes(ctx.from.username)
      ) {
        return `admin`;
      } else {
        return `non-admin`;
      }
    },
  };

  const keyboard = async () => {
    if (await statusChecker(subscriber)) {
      return Markup.inlineKeyboard([
        [Markup.callbackButton(`Unsubscribe from feed!`, `unsubscribe`)],
        [Markup.callbackButton(`Refresh the page`, `stats`)],
      ]);
    } else {
      return Markup.inlineKeyboard([
        [Markup.callbackButton(`Subscribe for feed!`, `subscribe`)],
        [Markup.callbackButton(`Refresh the page`, `stats`)],
      ]);
    }
  };

  await create(subscriber)
    .then(async () => {
      await ctx.editMessageCaption(
        `<b>User status preview:</b>` +
          `\n` +
          `\n` +
          `<b>ID:</b> <code>${status.id}</code>` +
          `\n` +
          `<b>First Name:</b> <code>${status.first_name}</code>` +
          `\n` +
          `<b>Last Name:</b> <code>${status.last_name}</code>` +
          `\n` +
          `<b>Username:</b> <code>${status.username}</code>` +
          `\n` +
          `<b>Language:</b> <code>${status.lang}</code>` +
          `\n` +
          `<b>Status:</b> <code>${await status.superuser()}</code>` +
          `\n` +
          `<b>Feeds:</b> <code>${await text(subscriber)}</code>` +
          `\n` +
          `\n` +
          `<b>Last Update:</b> <code>${uptime}</code>`,
        {
          parse_mode: "HTML",
          reply_markup: await keyboard(),
        }
      );
    })
    .catch((errors) => console.log(errors));
});

composer.action(`unsubscribe`, async (ctx) => {
  const uptime = await new Date().toLocaleString();

  const subscriber = ctx.from.id;
  const status = {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
    lang: ctx.from.language_code,
    superuser: async () => {
      if (
        database.users["eternal"].includes(ctx.from.id) ||
        database.users["temporary"].includes(ctx.from.username)
      ) {
        return `admin`;
      } else {
        return `non-admin`;
      }
    },
  };

  const keyboard = async () => {
    if (await statusChecker(subscriber)) {
      return Markup.inlineKeyboard([
        [Markup.callbackButton(`Unsubscribe from feed!`, `unsubscribe`)],
        [Markup.callbackButton(`Refresh the page`, `stats`)],
      ]);
    } else {
      return Markup.inlineKeyboard([
        [Markup.callbackButton(`Subscribe for feed!`, `subscribe`)],
        [Markup.callbackButton(`Refresh the page`, `stats`)],
      ]);
    }
  };

  await remove(subscriber)
    .then(async () => {
      await ctx.editMessageCaption(
        `<b>User status preview:</b>` +
          `\n` +
          `\n` +
          `<b>ID:</b> <code>${status.id}</code>` +
          `\n` +
          `<b>First Name:</b> <code>${status.first_name}</code>` +
          `\n` +
          `<b>Last Name:</b> <code>${status.last_name}</code>` +
          `\n` +
          `<b>Username:</b> <code>${status.username}</code>` +
          `\n` +
          `<b>Language:</b> <code>${status.lang}</code>` +
          `\n` +
          `<b>Status:</b> <code>${await status.superuser()}</code>` +
          `\n` +
          `<b>Feeds:</b> <code>${await text(subscriber)}</code>` +
          `\n` +
          `\n` +
          `<b>Last Update:</b> <code>${uptime}</code>`,
        {
          parse_mode: "HTML",
          reply_markup: await keyboard(),
        }
      );
    })
    .catch((errors) => console.log(errors));
});

middleware(composer);
consoles.module(__filename);
