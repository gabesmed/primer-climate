export default [
  // {
  //   title: 'Energy trader',
  //   startingPlayer: {money: 10000},
  //   leverNames: [
  //     'fuels.fossil.petro',
  //     'fuels.fossil.efficiency',
  //     'fuels.nuclear',
  //     'fuels.renewables.wind',
  //     'fuels.renewables.hydro',
  //     'fuels.renewables.marine',
  //     'fuels.renewables.solar',
  //     'fuels.renewables.geothermal',
  //     'fuels.renewables.storage'
  //   ]
  // },
  // {
  //   title: 'Livestock farmer',
  //   startingPlayer: {money: 10000},
  //   leverNames: [
  //     'land.food.crops',
  //     'land.food.livestock.grain',
  //     'land.food.livestock.pasture',
  //     'land.food.waste',
  //     'land.use.surplus',
  //     'land.use.efficiency',
  //     'lifestyle.diet.calories',
  //     'lifestyle.diet.meatamount',
  //     'lifestyle.diet.meattype'
  //   ]
  // },
  {
    title: 'Manufacturing plant',
    name: 'mfg',
    startingPlayer: {
      money: 2000000,
      brand: 0,
      numEmployees: 1,
      employeeSalary: 100000
    },
    // RCP 8.5
    startingPathway: 'g311111111111111c1b111cybihogjgi233ssr2eAs11111gA2211111111',
    startingYear: 2016,
    numYears: 30,
    levers: [{
      name: 'tech.manufacturing.materials',
      scaling: 1
    }, {
      name: 'tech.manufacturing.metals',
      scaling: 1
    }, {
      name: 'tech.manufacturing.chemicals',
      scaling: 1
    }, {
      name: 'tech.manufacturing.other',
      scaling: 1
    }, {
      name: 'tech.manufacturing.cement',
      scaling: 1
    }, {
      name: 'lifestyle.travel.freightdist',
      // one 100,000x of world's scale
      scaling: 1.0 / 100000.0,
      unit: 'average ton-miles freight distance',
      // 0.6 miles is 1 km, and
      // 1 ton-km is a trillionth of a trillion ton-kms
      unitScale: 0.621371 / 1000000000000.0
    }],
    products: [{
      name: 'a',
      title: 'Widget A',
      productionPerYear: 0,
      demandPerYear: 1000,
      costToProduce: 5,
      salePrice: 10,
      isActive: true
    }, {
      name: 'b',
      title: 'Widget B',
      productionPerYear: 0,
      demandPerYear: 1000,
      costToProduce: 20,
      salePrice: 50,
      isActive: false
    }, {
      name: 'c',
      title: 'Widget C',
      productionPerYear: 0,
      demandPerYear: 1000,
      costToProduce: 100,
      salePrice: 250,
      isActive: false
    }],
    budgetOptions: [
      {
        title: 'Hire an employee',
        cost: 100000,
        employeeDelta: 1
      },
      {
        title: 'More recycled steel',
        cost: 300000,
        leverName: 'tech.manufacturing.materials',
        leverDelta: 1
      }, {
        title: 'Improve steel mfg',
        cost: 300000,
        leverName: 'tech.manufacturing.metals',
        leverDelta: 1
      }, {
        title: 'Improve CO2 from chemicals',
        cost: 300000,
        leverName: 'tech.manufacturing.chemicals',
        leverDelta: 1
      }, {
        title: 'Improve CO2 from other',
        cost: 300000,
        leverName: 'tech.manufacturing.other',
        leverDelta: 1
      }, {
        title: 'Improve CO2 from cement',
        cost: 300000,
        leverName: 'tech.manufacturing.cement',
        leverDelta: 1
      }, {
        title: 'Lessen freight distance',
        cost: 300000,
        leverName: 'lifestyle.travel.freightdist',
        leverDelta: 1
      }
    ]
  }
  // {
  //   title: 'Real estate developer',
  //   startingPlayer: {money: 10000},
  //   leverNames: [
  //     'lifestyle.homes.size',
  //     'lifestyle.homes.temp',
  //     'lifestyle.homes.products',
  //     'tech.buildings.insulation',
  //     'tech.buildings.temp',
  //     'tech.buildings.appliances',
  //     'lifestyle.travel.mode',
  //     'lifestyle.travel.carownership',
  //     'lifestyle.travel.passengerdist'
  //   ]
  // }
];
