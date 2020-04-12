const NOT_FOUND = 'NOT FOUND'
const NUTRITION_FACTS_SUFIX = 'NUTRITION FACTS'
const FOOD_INFO_SUFIX = 'FOOD INFORMATION'
const SPACE = ' '

function build(messagesArray) {
    return messagesArray.join(SPACE)
}

export default {
    build,
    NOT_FOUND,
    NUTRITION_FACTS_SUFIX,
    FOOD_INFO_SUFIX
}