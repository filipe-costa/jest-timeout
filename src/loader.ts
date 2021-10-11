
const fetchJSON = (url: string) => {
  return fetch(url)
    .then((res) => res.json())
}

export class Loader {
  cache: any = {}
  load() {
    return new Promise((resolve) => {
      fetchJSON("resources/mock.json")
      .then((res) => this.loadAll(res.data))
      .then((res) => {
        return new Promise((resolve) => {
          console.log(res)
          res.forEach((obj) => {
            console.log(`obj: ${JSON.stringify(obj)}`)
            this.cache[obj.name] = obj.value
          })
          resolve({})
        })
      })
      .then(resolve)
    })
  }

  loadAll(urls: string[]) {
    console.log(`urls: ${urls}`)
    return Promise.all(urls.map((url) => fetchJSON(url)))
  }
}