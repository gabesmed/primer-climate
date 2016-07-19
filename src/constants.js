const STOCK_PATHWAYS = [{
  title: 'Distributed effort',
  encoded: '22rfoe2ss3besss1ssssssssssssssss222sssssss11111sr2211111111'
}, {
  title: 'Consumer reluctance',
  encoded: '22rfoe2s23be22312333333333rrr2rr2223333333111112sp211111111'
}, {
  title: 'Low action on forests',
  encoded: '22rfoe2333be3331333333332s333333222232332311111p32211111111'
}, {
  title: 'Consumer activism',
  encoded: '22rf32o333be333232222233322223222m323f3222111113s2211111111'
}, {
  title: 'IEA 6DS',
  encoded: '22rfoe2e13be1111c2c2c1n31hfjdcef222hp233f211111fn2211111111'
}, {
  title: 'IEA 4DS',
  encoded: '22rfoe2ib3becdd1ep2p2cp3e2ilgfgi222r3233j3111112f2211111111'
}, {
  title: 'IEA 2DS',
  encoded: '22rfzhgsi3bee331jx3xp3C333lnoojp222333332f111113r2211111111'
}, {
  title: 'Shell Mountains',
  encoded: 'm22l3221w4211f3123333p23z32g1wd322223mqpfD111112A2211111111'
}, {
  title: 'Shell Oceans',
  encoded: 'm21d22m3l3211p4123333c34jhogb4e422op3oqpt411111242211111111'
}, {
  title: 'Mott MacDonald',
  encoded: '223C322C2C332pCpdzzn22p322of1lf2plp2rspAC211111322211111111'
}, {
  title: 'Climact',
  encoded: '2233333333333333333331331fnnnnnn333222222d111112s2211111111'
}, {
  title: 'ICEPT',
  encoded: '22rfzhgw33bee331dzzn2j33p2sn33jy2332322p2f11111232211111111'
}, {
  title: 'RCP 8.5',
  encoded: 'g311111111111111c1b111cybihogjgi233ssr2eAs11111gA2211111111'
}, {
  title: 'RCP 6.0',
  encoded: 'mjfffeedbmmosqr2jj2jj1s31bg11e11333213312111111112211111111'
}, {
  title: 'RCP 2.6',
  encoded: 'p1ql222n2fffcjgt3stttBppBhhg1d11y3x3333np311111ot2211111111'
}, {
  title: 'TIAM UCL 4DS',
  encoded: 'l23xiiiqpi2p2f1cf2poj12p12db1nr1ppp2p222ph11111c22211111111'
}, {
  title: 'TIAM UCL 2DS',
  encoded: 'l2wz222CBpp3pC3f2Dw3DC3plzgj1tA13pp2p223ri11111p22211111111'
}, {
  title: 'WEC/PSI-Jazz',
  encoded: 'rirfne2bb2bd1111jx3xpb13igihghih222pp23312111112f2211111111'
}, {
  title: 'WEC/PSI-Symphony',
  encoded: 'jnrfxg22pobdeoo1zzzz3l23vqhwo3gm22233333bf111113r2211111111'
}, {
  title: 'Vegan Society',
  encoded: '2222jjj21222gfgebf1jg1igcjgjeeefDDDDD11n2211111DB2211111111'
}, {
  title: 'Cambridge Architectural Research',
  encoded: 'pps3p32p3p33333p2qqqqf33f2s33j33p2t2p1p21p11111p32211111111'
}, {
  title: 'Chatham House Low Meat',
  encoded: '22rfoe2ib3becdd1dr1hhcp3e2ilgfgi33433333j3111113g2211111111'
}, {
  title: 'Chatham House High Meat',
  encoded: '22rfzhgsi3bee331dzzn2jC333lnoojp111333332f11111332211111111'
}, {
  title: 'World Nuclear Assoc (Allegro)',
  encoded: '22qqo223422j2222q33pqt43343oq322223h32333q11111f32211111111'
}, {
  title: 'World Nuclear Assoc (Largo)',
  encoded: '22qqo223322jt332qqqpq23323qoqr22223h32333q11111fB2211111111'
}];

const SCENARIOS = [
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

export default {
  STOCK_PATHWAYS: STOCK_PATHWAYS,
  SCENARIOS: SCENARIOS
}
