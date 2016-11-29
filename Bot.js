var Nightmare = require('nightmare');
var nodemailer = require('nodemailer');

var login = 'login@servidor.com';
var password = 'senha';

var nightmare = Nightmare({ show: false });
var transporter = nodemailer.createTransport('smtps://login%40gmail.com:senha@smtp.gmail.com');

startNightmare();

function startNightmare(){
  nightmare
  .goto('https://www.packtpub.com/packt/offers/free-learning')
  .cookies.get('__logged_in')
  .then(function(cookies){
    if(cookies.value == 1){
      getBook(nightmare);
    } else {
      logIn(nightmare);
    }
  })
}

function logIn(night){
  night
  .wait('.login-popup')
  .click('.login-popup')
  .type('#email', login)
  .type('#password', password)
  .click('#edit-submit-1')
  .wait(10000)
  .then(function () {
    getBook(night)
  })
}

function getBook(night){
  night
  .wait('.twelve-days-claim')
  .click('.twelve-days-claim')
  .wait('#product-account-list .product-top-line .title')
  .evaluate(function () {
    return document.querySelector('.title').innerHTML.replace(/\[eBook\]/g, '').trim();
  })
  .end()
  .then(function (result) {
    //result é o título do email
    var email = {
      from: '"Nome" <email@servidor.com>',
      to: '"Nome" <email@servidor.com>',
      subject: 'Titulo',
      text: 'Corpo da Mensagem'
    }

    transporter.sendMail(email, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}