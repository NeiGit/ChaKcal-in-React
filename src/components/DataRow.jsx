import React, { Component } from 'react';

class DataRow extends Component {
    state = { 
        edit : true
    }
    render() { 

        const {nutritionChart} = this.props
        return ( 
            <tr>
                <td>{nutritionChart.food.label}</td>
                <td>grams</td>
                <td> {nutritionChart.totalWeight}
                {/*<input value = {nutritionChart.totalWeight}  onChange =  {(e) => this.props.handleWeightChange(nutritionChart.food.id, e.target.value)}  ></input>*/}
                    <button type ='button' style = {{'margin-left': '5pt'}}  onClick = {() => this.props.handleWeightChange(nutritionChart.food.id, 1)}>+</button>
                    <button type ='button' style = {{'margin-left': '5pt'}} onClick = {() => this.props.handleWeightChange(nutritionChart.food.id, -1)}>-</button>
                </td>
                <td>{nutritionChart.calories}</td>
                <td>{nutritionChart.totalNutrients.PROCNT.quantity}</td>
                <td>{nutritionChart.totalNutrients.FAT.quantity}</td>
                <td>{nutritionChart.totalNutrients.CHOCDF.quantity}</td>
                <td>{nutritionChart.totalNutrients.FIBTG.quantity}</td>
                <td><button type = "button" className = "btn btn-dark badge badge-secondary table-remove-button" onClick = {() => this.props.handleDeleteRow(nutritionChart.food.id)}>X</button></td>
            </tr>
        );
    }

    enableInput = () => {
        this.setState({
            edit : false
        })
    }

    handleAddWeight = () => {
        
    }
}




 
export default DataRow;