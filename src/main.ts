// Bot with Web App
// Developed by Yaroslav Volkivskyi (TheLaidSon)

// Actual v0.9.2 Beta

// Main File

import { ObjectId } from "mongodb";
import arch from "./base/architecture";
import Function from "./data/function";
import keyboards from "./data/keyboards";
import Link from "./data/link";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

async function main() {
  const [ onTextMessage, bot, db, base ] = await arch();

  const link = Link(Boolean(process.env.LAN));

  //Begin bot work, collecting user data (his telegram name)
  bot.start((ctx) => {
    console.log('\n\nBOT STARTED (Pressed /start button)');
    ctx.replyWithPhoto({ source: path.join(__dirname, 'base/start/start_media_send.jpg') },{ 
        caption: 'Перед вами дверь к разгадкам... Но нужен код! Готовы войти? Заходите в приложение!',
        reply_markup: {
          inline_keyboard: [
              [{ text: 'Открыть', web_app: { url: `${link}/webapp?userId=${ ctx?.chat?.id }` } }]
          ]
        }
      });
    // ctx.reply('Привет! Нажми на кнопку ниже, чтобы начать пользоваться ботом', {
    //   reply_markup: {
    //       inline_keyboard: [
    //           [{ text: 'Открыть', web_app: { url: `${link}/webapp?userId=${ ctx?.chat?.id }` } }]
    //       ]
    //   }
    // });

    const username = ctx.chat.type === "private" ? ctx.chat.username ?? null : null;
    db.set(ctx.chat.id)('username')(username ?? 'unknown');
    db.set(ctx.chat.id)('id')(ctx.chat.id.toString());
    db.set(ctx.chat.id)('state')('ErrorsException');
  });

  bot.command('post', async (ctx) => {
    ctx.reply('Вы используете функцию для создания новой комбинации.\n\nВыберите ниже для какой функции эта комбинация', {
      reply_markup: {
        keyboard: keyboards.functions(),
      }
    });

    await db.set(ctx.chat.id)('state')('CheckFunctionAndGetCombination');
  });

  bot.command('show', async (ctx) => {
    const combinations = await base.GetAll();

    if (combinations.length){
      await ctx.reply('Все комбинации:');
      for (let i = 0; i < combinations.length; i++) {
        await ctx.reply(`${i+1}.\n\n Функция - ${Function(combinations[i].func, 'reverse') || 'Ошибка отображения'}\n Комбинация - ${combinations[i].combination}\n Бесплатная - ${combinations[i].free ? 'Да' : 'Нет'}\n Количество доступных использований - ${combinations[i].available_count}`)
      }
    }
    else ctx.reply('Жаль, но на данный момент нету активных комбинаций')
  })

  bot.command('adm', async (ctx) => {
    const combinations = await base.GetAll();
    await ctx.reply('Отлично, теперь выберите комбинцию с которой нам предстоит работать');

    for (let i = 0; i < combinations.length; i++) {
      await ctx.reply(`${i+1}.\n\n Функция - ${Function(combinations[i].func, 'reverse') || 'Ошибка отображения'}\n Комбинация - ${combinations[i].combination}\n Бесплатная - ${combinations[i].free ? 'Да' : 'Нет'}\n Количество доступных использований - ${combinations[i].available_count}`, {
        reply_markup: {
          keyboard: combinations.map((v, i) => [`${i+1}`]),
        }
      })
    }

    await db.set(ctx?.chat?.id)('state')('AdmRespondCombinationAndRoot');
  })
  
  //Get real user name and root to get phone number
  onTextMessage('ErrorsException', async (ctx, user, set, data) => {
    ctx.reply('Тебе просто нужно нажать на кнопочку ниже, ничего присылать и писать не нужно!', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'Открыть', web_app: { url: `${link}/webapp?userId=${ ctx?.chat?.id }` } }]
          ]
      }
    });
  });

  onTextMessage('CheckFunctionAndGetCombination', async (ctx, user, set, data) => {
    if (keyboards.RegularButtons(keyboards.functions(), data.text)) {
      await set('combination_function')(data.text);
      ctx.reply('Отлично, теперь введите комбинацию (пример: 6912)');
      await set('state')('CheckCombinationAndCheckIfFree');
    }
    else ctx.reply('Такой функции нет в списке. Попробуйте ещё раз', {
      reply_markup: {
        keyboard: keyboards.functions(),
      }
    })
  });

  onTextMessage('CheckCombinationAndCheckIfFree', async (ctx, user, set, data) => {
    const combinations = await base.GetAll();
    if (keyboards.CheckIfCombinationCorrect(data.text, combinations)) {
      await set('combination')(data.text);
      ctx.reply('Замечательно, является ли эта комбинация бесплатной?', {
        reply_markup: {
          keyboard: keyboards.yesNo()
        }
      });
      await set('state')('CheckIfFreeAndSend');
    }
    else ctx.reply('Вы ввели не правильно комбинацию либо она уже присутствует, следуйте примеру: 6912');
  })

  onTextMessage('CheckIfFreeAndSend', async (ctx, user, set, data) => {
    if (keyboards.RegularButtons(keyboards.yesNo(), data.text)) {
      switch(data.text){
        case 'Да':
          ctx.reply('Изумительно, какое количество пользователей может активировать данную комбинацию?');
          await set('state')('RespondCountUserAndSend');
          break;

        case 'Нет':
          const func = Function(user['combination_function']);

          if (func){
            await base.AddCombination({
              func: func,
              combination: user['combination'].split(''),
              free: false,
              available_count: 1
            })
            ctx.reply('Окей, теперь комбинация добавлена и готова к использованию! Просматривать статистику по комбинации можете спомощью команды /show');
          }
          else ctx.reply('Ошибка добавления комбинации. Воспользуйтесь командой /post_combination');
          await set('state')('ErrorsException');
          break;
      }
    }
  });

  onTextMessage('RespondCountUserAndSend', async (ctx, user, set, data) => {
    if (!isNaN(parseInt(data.text)) && parseInt(data.text) > 0) {
      const func = Function(user['combination_function']);
      if (func) {
        await base.AddCombination({
          func: func,
          combination: user['combination'].split(''),
          free: true,
          available_count: parseInt(data.text)
        });

        ctx.reply('Поздравляю, теперь комбинация добавлена и готова к использованию! Просматривать статистику по комбинации можете спомощью команды /show');
      }
      else ctx.reply('Ошибка добавления комбинации. Воспользуйтесь командой /post_combination');
      await set('state')('ErrorsException');
    }
  })

  onTextMessage('AdmRespondCombinationAndRoot', async (ctx, user, set, data) => {
    const combinations = await base.GetAll();

    if (!isNaN(parseInt(data.text)) && parseInt(data.text) > 0 && parseInt(data.text) <= combinations.length) {
      await set('adm_combination_id')(combinations[parseInt(data.text) - 1]._id.toString());
      ctx.reply('Теперь выберите что вам нужно изменить в данной комбинации', {
        reply_markup: {
          keyboard: keyboards.ADMPANEL()
        }
      });

      await set('state')('AdmRespondRootAndGoAction');
    }
    else ctx.reply('Такой комбинации нет в списке. Попробуйте ещё раз', {
      reply_markup: {
        keyboard: combinations.map((v, i) => [`${i+1}`])
      }
    });
  })

  onTextMessage('AdmRespondRootAndGoAction', async (ctx, user, set, data) => {
    switch(data.text){
      case 'Целевая функция':
        ctx.reply('Теперь выберите функцию', {
          reply_markup: {
            keyboard: keyboards.functions()
          }
        });
        await set("state")('AdmRespondFunction');
        break;

      case 'Комбинация':
        ctx.reply('Введите комбинацию');
        await set('state')('AdmRespondCombination');
        break;

      case 'Количество доступных активаций':
        ctx.reply('Теперь введите количество доступных активаций');
        await set('state')('AdmRespondCountUser');
        break;

      case 'Платно/Бесплатно':
        const combination = await base.GetCombination(new ObjectId(user['adm_combination_id']));
        await base.EditCombination(new ObjectId(user['adm_combination_id']), 'free', !combination!.free);
        ctx.reply('Статус успешно изменен для этой комбинации на ' + (combination!.free ? 'платный' : 'бесплатный') + '!');
        break;

      case 'Удалить':
        const id = new ObjectId(user['adm_combination_id']);
        await base.DeleteCombination(new ObjectId(id));
        ctx.reply('Комбинация успешно удалена! Для просмотра всех комбинаций воспользуйтесь командой /show');
        break;

      default:
        ctx.reply('Такого пункта нет в списке. Попробуйте ещё раз', {
          reply_markup: {
            keyboard: keyboards.ADMPANEL()
          }
        })
        break;
    }
  })

  onTextMessage('AdmRespondFunction', async (ctx, user, set, data) => {
    if (keyboards.RegularButtons(keyboards.functions(), data.text)) {
      await base.EditCombination(new ObjectId(user['adm_combination_id']), 'func', Function(data.text));
      ctx.reply('Функция для данной комбинации успешно изменена!');
    }
    else ctx.reply('Такой функции нет в списке. Попробуйте ещё раз', {
      reply_markup: {
        keyboard: keyboards.functions()
      }
    });
  });

  onTextMessage('AdmRespondCountUser', async (ctx, user, set, data) => {
    if (!isNaN(parseInt(data.text)) && parseInt(data.text) > 0){
      await base.EditCombination(new ObjectId(user['adm_combination_id']), 'available_count', parseInt(data.text));
      ctx.reply('Количество активаций для данной комбинации успешно изменено!');
    }
    else ctx.reply('Такое количество недопустимо. Попробуйте ещё раз');
  });

  onTextMessage('AdmRespondCombination', async (ctx, user, set, data) => {
    if (keyboards.CheckIfCombinationCorrect(data.text, await base.GetAll())){
      await base.EditCombination(new ObjectId(user['adm_combination_id']), 'combination', data.text.split(''));
      ctx.reply('Комбинация для данной комбинации успешно изменена!');
    }
    else ctx.reply('Такая комбинация недопустима. Попробуйте ещё раз');
  })

  bot.launch();
}

main();