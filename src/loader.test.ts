import {Loader as PixiLoader} from "pixi.js"
import { ResourceLoader } from "./loader"
import mock from "./__fixtures__/mock.json"
import mock1 from "./__fixtures__/mock1.json"
import mock2 from "./__fixtures__/mock2.json"
import pikachuMock from "./__fixtures__/pikachuMock.json"
import charmanderMock from "./__fixtures__/charmanderMock.json"
import pixiMock from "./__fixtures__/pixiMock.json"

// Uncomment when running the last unit test
import {pixijsMock} from "./__fixtures__/pixijsmock"

// @ts-ignore
global.fetch = jest.fn()

describe("Promise", () => {
  const loader = new ResourceLoader()

  beforeAll(() => {
    // @ts-ignore
    global.fetch.mockImplementation((url) => {
      switch(url) {
        case "resources/mock.json":
          return Promise.resolve({json: () => Promise.resolve(mock)})
        case "resources/mock1.json":
          return Promise.resolve({json: () => Promise.resolve(mock1)})
        case "resources/mock2.json":
          return Promise.resolve({json: () => Promise.resolve(mock2)})
        case "resources/pixiMock.json":
          return Promise.resolve({json: () => Promise.resolve(pixiMock)})
        case "resources/charmanderMock.json":
          return Promise.resolve({json: () => Promise.resolve(charmanderMock)})
        case "resources/pikachuMock.json":
          return Promise.resolve({json: () => Promise.resolve(pikachuMock)})
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
    return loader.pixiLoad()
      .then(() => {
        expect(Object.values(loader.loader.resources).length).toBe(2)
      })
  })

  // This test fails when doing a regular javascript import
  it("pixijs resource loader should correctly exit", (done) => {
    const loader = PixiLoader.shared
    loader.add(pixijsMock)
      .load(() => {
        console.log(loader.resources)
        done()
      })
  })
})