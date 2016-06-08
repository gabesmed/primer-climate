/**
 * Default value possibilities are 1.0-4.0.
 * possible flags are 'max', and 'integer'
 */
const LEVER_SECTIONS = [{
  title: 'Demographics',
  key: 'demographics',
  groups: [{
    title: 'Demographics',
    key: 'demographics',
    levers: [
      {title: 'Global population', key: 'globalpop', pos: 1, max: 3},
      {title: 'Urbanization', key: 'urbanization', pos: 2, max: 3}
    ]
  }]
}, {
  title: 'Lifestyle',
  key: 'lifestyle',
  groups: [{
    title: 'Travel',
    key: 'travel',
    levers: [
      {title: 'Passenger distance', key: 'passengerdist', pos: 3},
      {title: 'Freight distance', key: 'freightdist', pos: 4},
      {title: 'Mode', key: 'mode', pos: 5},
      {title: 'Occupancy & load', key: 'occupancy', pos: 6},
      {title: 'Car own or hire', key: 'carownership', pos: 7}
    ]
  }, {
    title: 'Homes',
    key: 'homes',
    levers: [
      {title: 'Building size', key: 'size', pos: 10},
      {title: 'Temperature & hot water use', key: 'temp', pos: 11},
      {title: 'Lighting & appliance use', key: 'appliances', pos: 12},
      {title: 'Product lifespan & demant', key: 'products', pos: 16}
    ]
  }, {
    title: 'Diet',
    key: 'diet',
    levers: [
      {title: 'Calories consumed', key: 'calories', pos: 33},
      {title: 'Quantity of meat', key: 'meatamount', pos: 34},
      {title: 'Type of meat', key: 'meattype', pos: 35}
    ]
  }]
}, {
  title: 'Technology',
  key: 'tech',
  groups: [{
    title: 'Transport',
    key: 'transport',
    levers: [
      {title: 'Transport efficiency', key: 'efficiency', pos: 8},
      {title: 'Electric & hydrogen', key: 'electric', pos: 9}
    ]
  }, {
    title: 'Buildings',
    key: 'buildings',
    levers: [
      {title: 'Building insulation', key: 'insulation', pos: 13},
      {title: 'Temperature & cooking tech', key: 'temp', pos: 14},
      {title: 'Appliance efficiency', key: 'appliances', pos: 15}
    ]
  }, {
    title: 'Manufacturing',
    key: 'manufacturing',
    levers: [
      {title: 'Design, materials & recycling', key: 'materials', pos: 17},
      {title: 'Iron, steel & aluminum', key: 'metals', pos: 18},
      {title: 'Chemicals', key: 'chemicals', pos: 19},
      {title: 'Paper & other', key: 'other', pos: 20},
      {title: 'Cement', key: 'cement', pos: 21}
    ]
  }, {
    title: 'Carbon capture and storage',
    key: 'ccs',
    levers: [
      {title: 'CCS (manufacturing)', key: 'manufacturing', pos: 22},
      {title: 'CCS (electricity)', key: 'electricity', pos: 25}
    ]
  }]
}, {
  title: 'Fuels',
  key: 'fuels',
  groups: [{
    title: 'Fossil fuels',
    key: 'fossil',
    levers: [
      {title: 'Coal, oil & gas', key: 'fossil', pos: 23},
      {title: 'Fossil fuel efficiency', key: 'efficiency', pos: 24}
    ]
  }, {
    title: 'Nuclear',
    key: 'nuclear',
    levers: [
      {title: 'Nuclear', key: 'nuclear', pos: 26}
    ]
  }, {
    title: 'Renewables',
    key: 'renewables',
    levers: [
      {title: 'Wind', key: 'wind', pos: 27},
      {title: 'Hydroelectric', key: 'hydro', pos: 28},
      {title: 'Marine', key: 'marine', pos: 29},
      {title: 'Solar', key: 'solar', pos: 30},
      {title: 'Geothermal', key: 'geothermal', pos: 31},
      {title: 'Storage & demand shifting', key: 'storage', pos: 32}
    ]
  }, {
    title: 'Bioenergy',
    key: 'bio',
    levers: [
      {title: 'Bioenergy yields', key: 'yields', pos: 40},
      {title: 'Solid or liquid', key: 'phase', pos: 41}
    ]
  }]
}, {
  title: 'Land',
  key: 'land',
  groups: [{
    title: 'Food yields',
    key: 'food',
    levers: [
      {title: 'Crop yields', key: 'crops', pos: 36},
      {title: 'Livestock (grains/residues fed)', key: 'livegrains', pos: 38},
      {title: 'Livestock (pasture fed)', key: 'livepasture', pos: 39},
      {title: 'Wastes & residues', key: 'waste', pos: 48}
    ]
  }, {
    title: 'Land use',
    key: 'land',
    levers: [
      {title: 'Surplus land (forest & bioenergy)', key: 'surplus', pos: 42},
      {title: 'Land-use efficiency', key: 'efficiency', pos: 37}
    ]
  }]
}, {
  title: 'Future',
  key: 'future',
  groups: [{
    title: 'Speculative greenhouse gas removal',
    key: 'ggr',
    levers: [
      {title: 'Biochar', key: 'biochar', pos: 43},
      {title: 'Direct air capture', key: 'aircapture', pos: 44},
      {title: 'Ocean fertilization', key: 'ocean', pos: 45},
      {title: 'Enhanced weathering (oceanic)', key: 'weatheringocean',
        pos: 46},
      {title: 'Enhanced weathering (terrestrial)', key: 'weatheringearth',
        pos: 47}
    ]
  }, {
    title: 'Emissions after 2050',
    key: 'trajectory',
    levers: [
      {title: 'Emissions trajectory', key: 'emissions', pos: 49}
    ]
  }]
}, {
  title: 'Basic physics',
  key: 'physics',
  groups: [{
    title: 'Basic physics',
    key: 'physics',
    levers: [
      {title: 'Atmospheric CO2 fraction', key: 'co2', pos: 50},
      {title: 'Confidence in climate models', key: 'confidence', pos: 51,
        max: 2, integer: true}
    ]
  }]
}];

const SCENARIOS = [{
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

export default {
  LEVER_SECTIONS: LEVER_SECTIONS,
  SCENARIOS: SCENARIOS
};
