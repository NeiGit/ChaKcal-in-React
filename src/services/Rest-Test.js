// Messing around with calls to API https://developer.edamam.com/food-database-api-docs

import fetch from 'node-fetch'
import RequestManager from './RequestManager.js'
import Messages from './Messages.js'
import ResponseManager from './ResponseManager.js'



// Test simple request (specifying food label only)

let request1 = fetch(RequestManager.simpleFoodRequestUrl('chocolate'))
    request1.then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    if (data.parsed.length == 0)
                        console.log(Messages.build([Messages.FOOD_INFO_SUFIX, Messages.NOT_FOUND]))
                    else {
                        console.log(data.parsed[0].food)
                        console.log(data.parsed[0].food.nutrients)
                    }
                })
            }
    }) 
     
// Test request specifying food and macronutrient

 /* let request2 = fetch(RequestManager.nutritionRequestUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "ingredients": [
          {
            "quantity": 0.10,
            "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
            "foodId": "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
          }
        ]
      })
    })

    request2.then(function(response) {
        if (response.ok) {
            response.json().then(function(nutritionResponse) {
                if(ResponseManager.validateNutritionResponse(nutritionResponse))
                    console.log(data)
                else
                    console.log(Messages.build([Messages.NUTRITION_FACTS_SUFIX, Messages.NOT_FOUND]))    
            })
        }
    })  */
