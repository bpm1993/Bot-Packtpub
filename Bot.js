var Nightmare = require('nightmare');

var login = 'bpmteste@teste.com';
var password = '123456789';

var nightmare = Nightmare({ show: false });

startNightmare();

setInterval(function(){
  startNightmare();
}, 86400000)

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
    console.log('teste');
    return document.querySelector('.title').innerHTML.replace(/\[eBook\]/g, '').trim();
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}