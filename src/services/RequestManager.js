import URLmanager from './URLmanager.js'
import ResponseManager from './ResponseManager.js'
import Calculator from './Calculator.js'


async function fetchId(foodLabel){
    // GET request using fetch with async/await
    const response = await fetch(URLmanager.simpleFoodRequestUrl(foodLabel))
    const data = await response.json()
    return data.parsed[0] !== undefined ? data.parsed[0].food.foodId : undefined
}

async function handleRequest(foodLabel, quantity) {
    // First we fetch the food to get the foodId parameter
    const promise = fetchId(foodLabel)
    promise.then(foodId => {

            if (foodId === undefined)
                return undefined
    
            const nutritionChart = handleDualEntryRequest(foodId, quantity)

            // Validation for NOT_FOUND results. Also add foodId attribute to nutritionChart (data)
            nutritionChart.then(nc => {
                if (ResponseManager.validateNutritionResponse(nc)) {
                    nc.food = {
                        label : foodLabel,
                        id : foodId
                    }
                    return nc
                } else {
                    return undefined
                }
            })
    })
}

async function handleDualEntryRequest(foodId, quantity) {
    const promise = await fetch(URLmanager.nutritionRequestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": [
              {
                "quantity": Calculator.gramsToKilograms(quantity),
                "measureURI": URLmanager.kilogramsURL,
                "foodId": foodId
              }
            ]
          })
        })
    const data = await promise.json()
    return data
}


export default {
    handleDualEntryRequest,
    fetchId,
    handleRequest
}

