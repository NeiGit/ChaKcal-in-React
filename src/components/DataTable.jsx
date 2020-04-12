import React, { Component } from 'react';
import DataRow from './DataRow.jsx'
import Utils from '../services/Utils.js'
import URLmanager from '../services/URLmanager.js'
import Calculator from '../services/Calculator.js'
import '../css/Common.css'


class DataTable extends Component {

    handleDeleteRow = foodId => {
        this.props.handleDeleteRow(foodId)
    }

    handleWeightChange = (foodId, weighToAdd) => {
        this.props.handleWeightChange(foodId, weighToAdd)
    }

    render() { 
        const {nutritionCharts} = this.props
        const nutritionChartRows = []
        const totals = {
            calories: 0,
            weight: 0,
            PROCNT: 0,
            FAT: 0,
            CHOCDF: 0,
            FIBTG: 0,
        }

        nutritionCharts.forEach( nc => {

            // First we have to make sure each nutritionChart has a complete internal state. Some times it comes without a nutrient, instead of having it set to zero. In that case we add the attribute and initialize to zero. Then we update same nutrient of the 'totals' array

            const quantity = 'quantity'

            URLmanager.NUTRIENTS.forEach( nutrient => {
                Calculator.round(nc.totalNutrients[nutrient] = Utils.processAttributeValue(quantity, nc.totalNutrients[nutrient], 0))
                totals[nutrient] = Calculator.round(totals[nutrient] + nc.totalNutrients[nutrient][quantity])
            })    

            // This two are outside 'totalNutrients' array, so we process them separately
            totals.calories = Calculator.round(totals.calories + nc.calories)
            totals.weight = Calculator.round(totals.weight + nc.totalWeight)

            // Finally, a new DataRow component is generated and then pushed to props array
            nutritionChartRows.push(<DataRow key = {nc.food.id} nutritionChart = {nc} handleDeleteRow = {this.handleDeleteRow} handleWeightChange = {this.handleWeightChange}/>)

        })

        return ( 
        <div>
            <table id="example" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Food</th>
                        <th>Measure</th>
                        <th>Quantity</th>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Fat</th>
                        <th>Carbs</th>
                        <th>Fiber</th>
                    </tr>
                </thead>
                <tbody> 
                {nutritionChartRows}
                <tr className = 'table-primary' id = 'Totals'>
                        <th>TOTALS</th>
                        <th>grams</th>
                        <th>{Calculator.round(totals.weight)} grs</th>
                        <th>{Calculator.round(totals.calories)} kcal</th>
                        <th>{Calculator.round(totals.PROCNT)} grs</th>
                        <th>{Calculator.round(totals.FAT)} grs</th>
                        <th>{Calculator.round(totals.CHOCDF)} grs</th>
                        <th>{Calculator.round(totals.FIBTG)} grs</th>
                        <th><button type="button" className= "btn btn-dark badge badge-secondary table-remove-button" onClick = {this.props.handleDeleteTable}> Clear Table </button></th>
                    </tr>
                </tbody>
            </table>
        </div>
        );
    }
}
export default DataTable;