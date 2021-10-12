import { ResourceLoader } from "./loader"
import mock from "./mock.json"
import mock1 from "./mock1.json"
import mock2 from "./mock2.json"
import pikachuMock from "./pikachuMock.json"
import charmanderMock from "./charmanderMock.json"
import pixiMock from "./pixiMock.json"

// @ts-ignore
global.fetch = jest.fn()

describe("Promise", () => {
  const loader = new ResourceLoader()

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
        case "resources/pixiMock.json":
          return Promise.resolve({json: () => pixiMock})
        case "resources/charmanderMock.json":
          return Promise.resolve({json: () => charmanderMock})
        case "resources/pikachuMock.json":
          return Promise.resolve({json: () => pikachuMock})
        default:
          console.log("oopsie")
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    console.log(loader.loader.resources)
  })

  it("should pass without using pixijs loader", () => {
    return loader.load()
      .then(() => {
        expect(loader.cache).toEqual({
          "hello": "world",
          "hello2": "world2"
        })
      })
  })

  it("should pass using pixijs loader", () => {
    console.log(('XMLHttpRequest' in window))
    return loader.pixiLoad()
      .then(() => {
        expect(Object.values(loader.loader.resources).length).toBe(2)
      })
  })
})