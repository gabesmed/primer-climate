import LeverUtils from './lever-utils'

export default class Calc {
  constructor() {
    this.cache = {}
  }

  calc(levers) {
    var encoded = LeverUtils.encode(levers)
    if (this.cache[encoded]) {
      return Promise.resolve(this.cache[encoded])
    }
    // console.log('fetching', encoded)
    var apiUrl = `/calc/${encoded}`
    fetch(apiUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        var lowEstimate = data[0].dashboard['temperature change Low'][1]
        var highEstimate = data[0].dashboard['temperature change High'][1]
        var result = {
          lowEstimate: lowEstimate,
          highEstimate: highEstimate
        }
        this.setState({
          isFetching: false,
          result: result
        })
        if (this.state.isFetchQueued) {
          this.setState({
            isFetchQueued: false
          })
          this.fetchResults()
        }
      })
  }
}
