import { checkForUrl } from './checkForUrl'

describe("checkForUrl function", () => {
    test("it should return true when passing a valid url", () => {
        const url ='https://example.com/test'
        expect(checkForUrl(url)).toBe(true)
    });
});