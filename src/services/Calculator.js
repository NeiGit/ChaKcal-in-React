function gramsToKilograms(grams) {
    return grams / 1000
}

function round(num) {
    //return Math.round((num + Number.EPSILON) * 100) / 100
    return Number(Math.round(num+'e'+3)+'e-'+3)
}

function getPercentageMultiplier(totalWeight, weighToAdd) {
    return (weighToAdd / totalWeight) + 1
}

function recalculateByWeight(nutritionChart, weightToAdd) {
    const percentageMultiplier = getPercentageMultiplier(nutritionChart.totalWeight, weightToAdd)
    if (percentageMultiplier > 0) {
        Object.entries(nutritionChart.totalNutrients).forEach(entry => {
            entry[1].quantity = round(entry[1].quantity * percentageMultiplier)
          })        
        nutritionChart.totalWeight = round(nutritionChart.totalWeight + weightToAdd)
        nutritionChart.calories = round(nutritionChart.calories * percentageMultiplier)
    }
    return nutritionChart
}

export default {
    gramsToKilograms,
    round,
    recalculateByWeight
}