#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper);

var CITRIX_USERNAME = system.env.CITRIX_USERNAME;
var CITRIX_PASSWORD = system.env.CITRIX_PASSWORD;

if(!CITRIX_USERNAME || !CITRIX_PASSWORD)  {
  console.log('Missing required env: CITRIX_USERNAME or CITRIX_PASSWORD')
  this.exit(1)
}

helpers.thenWithErrors(casper, function(){
  return casper.click('.auth__button--citrix');
})

casper.waitForSelector("#credentials")

helpers.thenWithErrors(casper, function(){
  casper.fill('#credentials', {
    'emailAddress': CITRIX_USERNAME,
    'password': CITRIX_PASSWORD
  })
  casper.click("#submit")
})

casper.waitForSelector('input[name="authorize"]')

helpers.thenWithErrors(casper, function(){
  casper.click('input[name="authorize"]')
})

helpers.assertOnOctobluDashboard(casper);

casper.run();
