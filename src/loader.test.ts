import { Loader } from "./loader"
import mock from "./mock.json"
import mock1 from "./mock1.json"
import mock2 from "./mock2.json"

// @ts-ignore
global.fetch = jest.fn()


describe("Promise", () => {
  const loader = new Loader()

  beforeEach(() => {
    // @ts-ignore
    global.fetch.mockImplementation((url) => {
      switch(url) {
        case "resources/mock.json":
          return Promise.resolve({json: () => mock})
        case "resources/mock1.json":
          return Promise.resolve({json: () => mock1})
        case "resources/mock2.json":
          return Promise.resolve({json: () => mock2})
        default:
          console.log("oopsie")
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should pass using promise", () => {
    return loader.load()
      .then(() => {
        expect(loader.cache).toEqual({
          "hello": "world",
          "hello2": "world2"
        })
      })
  })
})