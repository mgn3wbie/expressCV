const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/imgs', express.static(path.join(__dirname, 'public/assets/imgs')));
app.use('/docs', express.static(path.join(__dirname, 'public/assets/docs')));


app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', (req, res) => {
    res.render('index', {
        showmodal: false,
        modalMessage: "",
        name: "",
        email: "",
        message: ""
    });
});

app.post('/message', (req, res) => {
    console.log(req.body);
    const data = req.body;
    let modalMessage = "";
    if (data.floatingName && data.floatingMail && data.floatingMessage) {
        console.log("data is valid");
        modalMessage = `Merci ${data.floatingName} ! Votre message a bien été reçu et sera traité dans les plus brefs delais.`;
    } else {
        console.log("data is not valid");
        modalMessage = "Veuillez remplir tous les champs";
    }
    res.render('index', {
        showmodal: true,
        modalMessage: modalMessage,
        name: data.floatingName,
        email: data.floatingMail,
        message: data.floatingMessage
    });
});

app.get('/*', (req, res) => {
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Up and listening on localhost:${port} !`);
});