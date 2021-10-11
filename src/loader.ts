import {Loader} from "pixi.js"

const fetchJSON = (url: string) => {
  return fetch(url)
    .then((res) => res.json())
}

export class ResourceLoader {
  loader = new Loader()

  cache: {[index: string]: string} = {}

  load = () => {
    return new Promise((resolve) => {
      fetchJSON("resources/mock.json")
      .then((res) => this.loadAll(res.data))
      .then(this.addToCache)
      .then(resolve)
    })
  }

  addToCache = (assets: {name: string, value: string}[]) => {
    return new Promise((resolve) => {
      assets.forEach((obj) => {
        // console.log(`obj: ${JSON.stringify(obj)}`)
        this.cache[obj.name] = obj.value
      })
      resolve({})
    })
  }

  loadAll = (urls: string[]) => {
    // console.log(`urls: ${urls}`)
    return Promise.all(urls.map((url) => fetchJSON(url)))
  }

  pixiLoad(){
    return new Promise((resolve) => {
      fetchJSON("resources/pixiMock.json")
        .then((res) => this.loadAll(res.assets))
        .then(this.addAssets)
        .then(resolve)
    })
  }

  addAssets = (assets: any[]) => {
    return new Promise((resolve) => {
      this.loader.add(assets).load(resolve)
    })
  }
}