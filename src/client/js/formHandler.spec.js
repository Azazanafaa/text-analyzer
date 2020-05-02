import { getAllData } from './formHandler.js'

const fetchMock = require('fetch-mock-jest')

describe("getAllData function", () => {
    test("it should return data when passing a non empty string", () => {
        fetchMock.mock('http://localhost:8082/getAnalysis', Promise.resolve({ data: 'test' }))
        let result = ''
        getAllData('/getAnalysis').then(res => {
            expect(res.data).toBe('test')
        })
    });
});

