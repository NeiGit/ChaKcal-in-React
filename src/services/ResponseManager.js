
/** This method determines if a valid nutritionResponse was received. Since empty responses are successfull, we have to check for emptiness by looking a what we consider 'key attributes'
 * @param  {} nutritionResponse, json object received as body response from API
 * @retunrs boolean, true if the response is valid
 */
function validateNutritionResponse(nutritionResponse) {
    return nutritionResponse.yield > 0 && nutritionResponse.calories > 0 && nutritionResponse.totalWeight > 0
}

export default {
    validateNutritionResponse
}