const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodeMailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'hello@gmail.com',
        pass: 'test'
    }
});

app.post('/submit', [
    check('meno').matches(/^[a-zA-Z\\áéíóúôďťňľčžšdž]+$/).isLength({ min: 3 }).not().isEmpty(),
    check('email').isEmail().isLength({ min: 3 }).not().isEmpty(),
    check('predmet').isLength({ min: 3 }).not().isEmpty(),
    check('text').isLength({ min: 10 }).not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        res.redirect('http://localhost:5500/error.html');
        res.end();
    } else {

        let mailOptions = {
            from: req.body.email,
            to: 'mato@deltanet.sk',
            subject: req.body.predmet,
            name: req.body.meno,
            body: req.body.text
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.redirect('http://localhost:5500/error.html');
                res.end();
            } else {
                res.redirect('http://localhost:5500/recieve.html');
                res.end();
            }
        });
    }
});

app.listen(3000, () => console.log('App is listening'));