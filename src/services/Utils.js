/**
 * @param  {} key a string containing the name of the attribute. Ex. 'PROCNT'
 * @param  {} attribute
 * @param  {} defValue
 */
const processAttributeValue = (key, attribute, defValue) => {
    if ( attribute === undefined ) {
        attribute = {
            [key] : defValue
        }
    }
    return attribute
    //return attribute !== undefined ? attribute[key] : defValue 
}


export default {
    processAttributeValue
}