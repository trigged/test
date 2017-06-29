'use strict'

const phantom = require('phantom');
const co = require('co')
const promise = require('bluebird')
//s_token=; s_id=; s_uid=
const c = [{
    name: 's_token',
    value: '72979fb7ff2d3045e022d0d338649d52'
  },
  {
    name: 's_id',
    value: '350812'
  },
  {
    name: 's_uid',
    value: 'p4e7v4n8K9I56c'
  }
]


let host = 'https://testclass.dadaabc.com/live/10557/s'
// host = 'https://stackoverflow.com/'
co(function* () {
  const instance = yield phantom.create()
  let jobs =  []
  for (let i=1; i<= 50; i++) {
     jobs.push(fakeUser(instance))
  }
  yield jobs
  while (true) {
    console.log(1)
  }
  // yield instance.exit()
}).then(console.error)

function * fakeUser(instance) {
  const page = yield instance.createPage();
  yield page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url)
  });

  for (var i in c) {
    console.log(c[i])
    yield page.addCookie(c[i])
  }
  const status = yield page.open(host);
  console.log('===>status', status);

  const content = yield page.property('content')
  console.log('===>content', content);
  return true
}
