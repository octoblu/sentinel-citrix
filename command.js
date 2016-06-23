#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper);

var EMAIL_CITRIX_USERNAME = system.env.EMAIL_CITRIX_USERNAME;
var EMAIL_CITRIX_PASSWORD = system.env.EMAIL_CITRIX_PASSWORD;

if(!EMAIL_CITRIX_USERNAME || !EMAIL_CITRIX_PASSWORD)  {
  console.log('Missing required env: EMAIL_CITRIX_USERNAME or EMAIL_CITRIX_PASSWORD')
  this.exit(1)
}

helpers.thenWithErrors(casper, function(){
  return casper.click('.auth__button--citrix');
})

casper.waitForText("Support")

helpers.thenWithErrors(casper, function(){
  casper.fillLabels('#credentials', {
    'emailAddress': EMAIL_CITRIX_USERNAME,
    'password': EMAIL_CITRIX_PASSWORD
  })
  casper.click("#submit")
})

helpers.assertOnOctobluDashboard(casper);

casper.run();
