import LeverUtils from './lever-utils'

class Calc {
  constructor() {
    this.cache = {}
  }

  calc(levers) {
    var encoded = LeverUtils.encode(levers)
    if (this.cache[encoded] instanceof Promise) {
      return this.cache[encoded]
    }
    if (this.cache[encoded]) {
      return Promise.resolve(this.cache[encoded])
    }
    this.cache[encoded] = fetch(`/calc/${encoded}`)
      .then(response => response.json())
      .then(data => {
        var processed = this.process(data)
        this.cache[encoded] = processed
        return processed
      })
    return this.cache[encoded]
  }

  process(data) {
    var lowEstimate = data[0].dashboard['temperature change Low'][1]
    var highEstimate = data[0].dashboard['temperature change High'][1]
    var result = {
      lowEstimate: lowEstimate,
      highEstimate: highEstimate
    }
    return result    
  }
}

const calc = new Calc()

export default calc
