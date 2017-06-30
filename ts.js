'use strict'

const phantom = require('phantom');
const co = require('co')
const promise = require('bluebird')
const Redis = require('ioredis')
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
co(function* () {
    let index = 1
    while (1) {
        const instance = yield phantom.create()
        let jobs = []
        for (let i = 1; i <= 50; i++) {
            jobs.push(fakeUser(instance))
        }
        yield jobs
        yield promise.delay(10000)
        index ++ 
        console.log('===> next loop', index)
        yield instance.exit()
    }

}).then(console.error)

function* fakeUser(instance) {
    const page = yield instance.createPage();

    for (var i in c) {
        yield page.addCookie(c[i])
    }
    const status = yield page.open(host);
    console.log('open page', status);

    const content = yield page.property('content')
    return true
}
