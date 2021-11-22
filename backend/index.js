import express from 'express';
import cors from "cors";
import {
    getProduct,
    getMenus,
    login,
    createPaymentIntent
    // register,
    // changeEmail,
    // changePassword,
    // verifyUserRegister,
    // verifyUserLogin,
    // getDataUrl,
    // enableTwofa,
    // disableTwofa
} from './functions.js';

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());

app.get('/api/v1/getMenus', getMenus);
app.post('/api/v1/getProduct', getProduct);
app.post('/api/v1/login', login);
app.post("/api/v1/createPaymentIntent", createPaymentIntent);
// app.post('/api/v1/register', register);
// app.post('/api/v1/changeEmail', changeEmail);
// app.post('/api/v1/changePassword', changePassword);
// app.post('/api/v1/verifyUserRegister', verifyUserRegister);
// app.post('/api/v1/verifyUserLogin', verifyUserLogin);
// app.post('/api/v1/getDataUrl', getDataUrl);
// app.post('/api/v1/enableTwofa', enableTwofa);
// app.post('/api/v1/disableTwofa', disableTwofa);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});