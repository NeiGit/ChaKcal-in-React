import KEYS from './Keys.js'

// URL BASES
const BASE_FOOD_REQUEST_URL = 'https://api.edamam.com/api/food-database/parser?ingr='
const BASE_NUTRITION_REQUEST_URL = 'https://api.edamam.com/api/food-database/nutrients?'
const BASE_CREDENTIALS_SUFIX = `&app_id=${KEYS.APP_ID}&app_key=${KEYS.APP_KEY}`

    // COMBINATIONS
    const nutritionRequestUrl = BASE_NUTRITION_REQUEST_URL + BASE_CREDENTIALS_SUFIX

// MEASURE UNITS
const kilogramsURL = "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram"

// NUTRIENTS ARRAY
const NUTRIENTS = ['PROCNT', 'FAT', 'CHOCDF', 'FIBTG']

const SPACE = '%20'// g stands for 'global', it will affect every space in given string

const REG_EXP_BASIC_SPACE = / /g

function formatFoodLabel(foodLabel) {
    return foodLabel.replace(REG_EXP_BASIC_SPACE, SPACE)
}

const simpleFoodRequestUrl = foodLabel => {
    return BASE_FOOD_REQUEST_URL + formatFoodLabel(foodLabel) + BASE_CREDENTIALS_SUFIX
}





export default {
    formatFoodLabel,
    simpleFoodRequestUrl,
    nutritionRequestUrl,
    kilogramsURL,
    NUTRIENTS
}
