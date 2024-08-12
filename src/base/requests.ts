import path from "path";
import * as openai from 'openai';
import { Express } from "express";
import { ChatCompletion } from "openai/resources/chat/completions";
import DataBase from "./databaseOperation";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

export default function Requests(app: Express, wRedis: any, mongo: MongoClient){
    const base = DataBase(mongo);

    app.get("/webapp", (req: any, res: any) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.get("/taroapp", (req: any, res: any) => {
        res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
    })
    
    app.get('/api/get', async (req: any, res: any) => {
        try {
            const userId = req.query.userId;
            const value = (await wRedis.getAll(parseInt(userId!.toString()))());
            res.json({value});
        } catch (err) {
            return 'error in init';
        }
    });

    app.post('/api/post', async (req: any, res: any) => {
        try {
            const {userId, key, value} = req.body,
            userid = parseInt(userId);
            await wRedis.set(userid)(key)(value);
            res.status(200).json({ userId, key, value });
        } catch (err) {
            res.status(500);
        }
    });

    app.post('/api/getPrediction', async (req: any, res: any) => {
        try {
            const { cardName, promptInputed } = req.body;
            const prediction = await askChatGPT(cardName, promptInputed);
            res.status(200).json({ prediction });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/getCombination', async (req: any, res: any) => {
        try {
            const value = await base.GetAll();
            res.json({value});
        } catch (err) {
            return 'error of getting data';
        }
    });

    app.post('/api/postCombination', async (req: any, res: any) => {
        try {
            const {func, combination, free, available_count} = req.body;
            await base.AddCombination({func, combination, free, available_count});
            res.status(200).json({ func, combination, free, available_count });
        } catch (err) {
            res.status(500);
        }
    });

    app.post('/api/deleteCombination', async (req: any, res: any) => {
        try {
            const {_id} = req.body;
            await base.DeleteCombination(new ObjectId(_id));
            res.status(200).json({ _id });
        } catch (err) {
            res.status(500);
        }
    });

    app.post('/api/changeCountFreeCombination', async (req: any, res: any) => {
        try {
            const {_id, count} = req.body;
            await base.ChangeAvailableCountFreeCombination(new ObjectId(_id), count);
            res.status(200).json({ _id, count });
        } catch (err) {
            res.status(500);
        }
    });

    app.post('/api/addUsersToCombination', async (req: any, res: any) => {
        try {
            const {_id, users} = req.body;
            await base.AddUsersToCombination(new ObjectId(_id), users);
            res.status(200).json({ _id, users });
        } catch (err) {
            res.status(500);
        }
    });

    app.get('/api/getAllKeys', async (req: any, res: any) => {
        try {
            const value = await wRedis.getAllKeys();
            res.json({value});
        } catch (err) {
            return 'error of getting data';
        }
    });

    async function askChatGPT(prompt: string, promptInputed?: boolean): Promise<string | undefined | null | ChatCompletion> {
        try {
            const client = new openai.OpenAI({
                apiKey: process.env.GPTKEY ?? '',
            });

            const response = await client.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'user',
                        content: promptInputed?
                            prompt:
                            `Ты - искусный таролог. На основе названия карты Таро, пожалуйста, сгенерируй предсказание, максимум в 95-ти словах, для человека на день. Учитывай символику и традиционное значение карты. Не забудь сделать предсказание вдохновляющим и позитивным. Название карты: ${prompt}.`,
                    },
                ] 
            });

            if (response && response.choices && response.choices.length > 0) {
                return response.choices[0].message.content;
            } else {
                return 'No response';
            }
        } catch (error: any) {
            return error;
        }
    }

    return base;
}