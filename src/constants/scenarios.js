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
    year: 2016,
    money: 10000,
    brand: 0,
    productionRate: 0,
    employees: 0
  },
  numYears: 30,
  leverNames: [
    'tech.manufacturing.materials',
    'tech.manufacturing.metals',
    'tech.manufacturing.chemicals',
    'tech.manufacturing.other',
    'tech.manufacturing.cement',
    'lifestyle.travel.freightdist'
  ],
  products: [
    {name: 'a', title: 'Widget A'},
    {name: 'b', title: 'Widget B'},
    {name: 'c', title: 'Widget C'}
  ]
},
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
]
