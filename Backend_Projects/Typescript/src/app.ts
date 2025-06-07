import express, {Express, NextFunction, Request, Response} from 'express';
import { User, IUser } from './models/User';

const app : Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request {
    startTime?: number;
}

// middleware -> add startTime to request
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    req.startTime = Date.now();
    console.log(`Request received at ${new Date(req.startTime)}`);
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Typescript with Express!');
});

app.get('/users', async(req: Request, res: Response)=> {
    try{
        const users : IUser[] = await User.find();
    }catch(e){
        res.status(400).json({message: 'Some error occured!'})
    }
})

interface User {
    name: string;
    email: string;
}

app.post('/user', (req: Request<{}, {}, User>, res: Response) => {
    const {name, email} = req.body;
    res.json({
        message : `User created ${name}-${email}`
    })
});

app.get('/users/:id', (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params;
    res.json({
        message: `User ID is ${id}`,
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
);