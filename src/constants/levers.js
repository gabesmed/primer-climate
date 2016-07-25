/**
 * Levers
 * baseline is 2011 value
 * value is by 2050
 * TODO: make linear interpolation in value more accurate
 */
export default [{
  num: 1,
  name: 'demographics.globalpop',
  title: 'Global population',
  max: 3,
  unit: 'billion people',
  baseline: 6.97,
  value: v => 10.9 - 0.13 * v
}, {
  num: 2,
  name: 'demographics.urbanization',
  title: 'Urbanization',
  max: 3,
  unit: 'percent of people living in urban areas',
  baseline: 52,
  value: v => 75 - 0.85 * v
}, {
  num: 3,
  name: 'lifestyle.travel.passengerdist',
  title: 'Passenger distance',
  unit: 'km/year',
  baseline: 9200,
  value: v => 13300 - 60 * v
}, {
  num: 4,
  name: 'lifestyle.travel.freightdist',
  title: 'Freight distance',
  unit: 'trillion ton-kms',
  baseline: 85,
  value: v => 85 * (1 + (1.46 - 0.0313 * v))
}, {
  num: 5,
  name: 'lifestyle.travel.mode',
  title: 'Mode of travel',
  unit: 'percent of urban km travelled in cars',
  baseline: 38,
  value: v => 65 - 1.2 * v
}, {
  num: 6,
  name: 'lifestyle.travel.occupancy',
  title: 'Occupancy & load',
  unit: 'average urban car load',
  baseline: 1.6,
  value: v => 1.4 + 0.0166 * v
}, {
  num: 7,
  name: 'lifestyle.travel.carownership',
  title: 'Car own or hire',
  unit: 'average urban car km/year',
  baseline: 15000,
  value: v => 12000 + 1400 * v
}, {
  num: 10,
  name: 'lifestyle.homes.size',
  title: 'Building size',
  unit: 'Average area of urban household, m^2',
  baseline: 92,
  value: v => 110 - 0.5 * v
}, {
  num: 11,
  name: 'lifestyle.homes.temp',
  title: 'Temp & hot water use',
  unit: 'degrees of home heating and cooling during winter and summer',
  baseline: 4.5,
  value: v => 2 + 0.1 * v
}, {
  num: 12,
  name: 'lifestyle.homes.appliances',
  title: 'Lighting & appliance use',
  unit: 'large appliances',
  baseline: 4,
  value: v => 6.3 - 0.073 * v
}, {
  num: 16,
  name: 'lifestyle.homes.products',
  title: 'Product lifespan & demand',
  unit: 'years of lifespan of an urban gasoline vehicle',
  baseline: 12.5,
  value: v => 12.5 + 0.123 * v
}, {
  num: 33,
  name: 'lifestyle.diet.calories',
  title: 'Calories consumed',
  unit: 'kcal/person/day',
  baseline: 2180,
  value: v => 2521 - 44 * v
}, {
  num: 34,
  name: 'lifestyle.diet.meatamount',
  title: 'Quantity of meat',
  unit: 'kcal/person/day',
  baseline: 187,
  value: v => 281 - 8.9 * v
}, {
  num: 35,
  name: 'lifestyle.diet.meattype',
  title: 'Type of meat',
  unit: 'percent from beef, lamb and goat',
  baseline: 22,
  value: v => 28 - 0.6 * v
}, {
  num: 8,
  name: 'tech.transport.efficiency',
  title: 'Transport efficiency',
  unit: 'liters of fuel per 100km',
  baseline: 8.6,
  value: v => 5.9 - 0.076 * v
}, {
  num: 9,
  name: 'tech.transport.electric',
  title: 'Electric & hydrogen',
  unit: 'percentage of passenger cars are electric/hydrogen',
  baseline: 0.2,
  value: v => 2 + 1.76 * v
}, {
  num: 13,
  name: 'tech.buildings.insulation',
  title: 'Building insulation',
  unit: 'avg heat loss of urban residential building, GW/Mha deg C',
  baseline: 16.9,
  value: v => 12 - 0.264 * v
}, {
  num: 14,
  name: 'tech.buildings.temp',
  title: 'Temp & cooking tech',
  unit: 'percent of heating from solar or heat pumps',
  baseline: 2,
  value: v => 2 + 2.2 * v
}, {
  num: 15,
  name: 'tech.buildings.appliances',
  title: 'Appliance efficiency',
  unit: 'percent efficiency of an urban TV',
  baseline: 250,
  value: v => 242.5 - 3.375 * v
}, {
  num: 17,
  name: 'tech.manufacturing.materials',
  title: 'Design, materials & recycling',
  unit: 'percent of recycled steel in products',
  baseline: 35,
  value: v => 35 + 1.333 * v
}, {
  num: 18,
  name: 'tech.manufacturing.metals',
  title: 'Iron, steel & aluminum',
  unit: 'tons of CO2 per ton of steel produced',
  baseline: 1.97,
  value: v => 1.97 - 0.014 * v
}, {
  num: 19,
  name: 'tech.manufacturing.chemicals',
  title: 'Chemicals',
  unit: 'tons of CO2 per ton of high value chemicals',
  baseline: 1.09,
  value: v => 1.09 - 0.0076 * v
}, {
  num: 20,
  name: 'tech.manufacturing.other',
  title: 'Paper & other',
  unit: 'tons of CO2 per ton of paper',
  baseline: 0.95,
  value: v => 0.95 - 0.016 * v
}, {
  num: 21,
  name: 'tech.manufacturing.cement',
  title: 'Cement',
  unit: 'tons of CO2 per ton of cement',
  baseline: 0.41,
  value: v => 0.4 - 0.006666667 * v
}, {
  num: 22,
  name: 'tech.ccs.manufacturing',
  title: 'Carbon capture (manufacturing)',
  unit: 'percent of emissions from steel manufacturing captured',
  baseline: 0,
  value: v => 0 + 2.666 * v
}, {
  num: 25,
  name: 'tech.ccs.electricity',
  title: 'Carbon capture (electricity)',
  unit: 'GW installed power capacity',
  baseline: 0,
  value: v => 16 + 122.8 * v
}, {
  num: 23,
  name: 'fuels.fossil.petro',
  title: 'Coal, oil & gas',
  unit: 'Percent of solid fuel in thermal power plants',
  baseline: 61,
  value: v => 61 - 1.166 * v
}, {
  num: 24,
  name: 'fuels.fossil.efficiency',
  title: 'Fossil fuel efficiency',
  unit: 'Percent of fossil fuel plants using ultra efficient tech',
  baseline: 25,
  value: v => 38 + 0.56666 * v
}, {
  num: 26,
  name: 'fuels.nuclear',
  title: 'Nuclear',
  unit: 'GW global nuclear capacity',
  baseline: 364,
  value: v => 0 + 62.33 * v
}, {
  num: 27,
  name: 'fuels.renewables.wind',
  title: 'Wind',
  unit: 'GW global wind capacity',
  baseline: 238,
  value: v => 0 + 215.53 * v
}, {
  num: 28,
  name: 'fuels.renewables.hydro',
  title: 'Hydro',
  unit: 'GW global hydroelectric capacity',
  baseline: 970,
  value: v => 1188 + 39.566 * v
}, {
  num: 29,
  name: 'fuels.renewables.marine',
  title: 'Marine',
  unit: 'GW global wave and tidal capacity',
  baseline: 0.5,
  value: v => 8 + 14.266 * v
}, {
  num: 30,
  name: 'fuels.renewables.solar',
  title: 'Solar',
  unit: 'GW global solar capacity',
  baseline: 71.3,
  value: v => 0 + 770.233 * v
}, {
  num: 31,
  name: 'fuels.renewables.geothermal',
  title: 'Geothermal',
  unit: 'GW global geothermal capacity',
  baseline: 11,
  value: v => 0 + 13.466 * v
}, {
  num: 32,
  name: 'fuels.renewables.storage',
  title: 'Storage & demand shifting',
  unit: 'GW global storage capacity',
  baseline: 120,
  value: v => 152 + 34.93 * v
}, {
  num: 40,
  name: 'fuels.bio.yields',
  title: 'Bioenergy yields',
  unit: 'Avg W yield per sq meter',
  baseline: 0.4,
  value: v => 0.48 + 0.0106 * v
}, {
  num: 41,
  name: 'fuels.bio.phase',
  title: 'Solid or liquid',
  unit: 'Percent of biofuels used that are liquid',
  baseline: 40,
  value: v => 20 + 2 * v
}, {
  num: 36,
  name: 'land.food.crops',
  title: 'Crop yields',
  unit: 'food energy W per m^2',
  baseline: 0.1,
  value: v => 0.1 + 0.0033 * v
}, {
  num: 38,
  name: 'land.food.livestock.grain',
  title: 'Livestock (grain/residues fed)',
  unit: 'pecent cattle meat from feedlot systems',
  baseline: 6,
  value: v => 0 + 1 * v
}, {
  num: 39,
  name: 'land.food.livestock.pasture',
  title: 'Livestock (pasture fed)',
  unit: 'cattle density, animals per hectare',
  baseline: 0.6,
  value: v => 0.7 + 0.01466 * v
}, {
  num: 48,
  name: 'land.food.waste',
  title: 'Wastes & residues',
  unit: 'energy from biocrops, W/m^2',
  baseline: 0.4,
  value: v => 0.48 + 0.010666 * v
}, {
  num: 42,
  name: 'land.use.surplus',
  title: 'Surplus land (forest & bioenergy)',
  unit: 'percent of surplus land for biocrops',
  baseline: 0,
  value: v => 0 + 2.666666667 * v
}, {
  num: 37,
  name: 'land.use.efficiency',
  title: 'Land-use efficiency',
  unit: 'percent land needed for same yield',
  baseline: 0,
  value: v => -10 + 1.333333333 * v
}, {
  num: 43,
  name: 'future.ggr.biochar',
  title: 'Biochar',
  unit: 'Gigatons of CO2 removed/year',
  baseline: 0,
  value: v => 0 + 0.11 * v
}, {
  num: 44,
  name: 'future.ggr.aircapture',
  title: 'Direct air capture',
  unit: 'Gigatons of CO2 removed/year',
  baseline: 0,
  value: v => 0 + 0.333333333 * v
}, {
  num: 45,
  name: 'future.ggr.ocean',
  title: 'Ocean fertilization',
  unit: 'Ggatons of CO2 removed/year',
  value: v => 0 + 1.0 * v
}, {
  num: 46,
  name: 'future.ggr.weathering.ocean',
  title: 'Enhanced weathering (oceanic)',
  value: v => {}
}, {
  num: 47,
  name: 'future.ggr.weathering.earth',
  title: 'Enhanced weathering (terrestrial)',
  value: v => {}
}, {
  num: 49,
  name: 'future.trajectory.emissions',
  title: 'Emissions trajectory',
  value: v => {}
}, {
  num: 50,
  name: 'physics.co2',
  title: 'Atmospheric CO2 fraction'
}, {
  num: 51,
  name: 'physics.confidence',
  title: 'Confidence in climate models',
  max: 2
}];
