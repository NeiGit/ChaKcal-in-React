import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.jsx'
import DataTable from './components/DataTable.jsx'
import Calculator from './services/Calculator'


class App extends Component {
    state = { 
      nutritionCharts : []
    }
    
    handleSearch = (nutritionChart) => {
      const existingNutritionChart = this.state.nutritionCharts.find(nc => nc.food.id === nutritionChart.food.id)
      if (existingNutritionChart) {
        Object.entries(existingNutritionChart.totalNutrients).forEach(entry => {
          entry[1].quantity = Calculator.round(entry[1].quantity + nutritionChart.totalNutrients[entry[0]].quantity)
        })
        existingNutritionChart.calories = Calculator.round(existingNutritionChart.calories + nutritionChart.calories)
        existingNutritionChart.totalWeight = Calculator.round(existingNutritionChart.totalWeight + nutritionChart.totalWeight)
        this.setState({
          nutritionCharts : this.state.nutritionCharts
        })

      } else 
      this.setState({
        nutritionCharts: [...this.state.nutritionCharts, nutritionChart]
      })
    }

    handleDeleteTable = () => {
      this.setState({
        nutritionCharts : []
      })
    }

    handleDeleteRow = foodId => {
      this.setState({
        nutritionCharts: this.state.nutritionCharts.filter(nc => nc.food.id !== foodId )
      })
    }

    handleWeightChange = (foodId, weightToAdd) => {
      let existingNutritionChart = this.state.nutritionCharts.find(nc => nc.food.id === foodId)
      Calculator.recalculateByWeight(existingNutritionChart, weightToAdd)

      this.setState({
        nutritionCharts : this.state.nutritionCharts
      })
    }
    
    render() {
      return (
        <div>
          <Search handleSearch = {this.handleSearch}/>
          {this.state.nutritionCharts.length > 0 && <DataTable nutritionCharts = {this.state.nutritionCharts} handleDeleteTable = {this.handleDeleteTable} handleDeleteRow = {this.handleDeleteRow} handleWeightChange = {this.handleWeightChange} />}
        </div>
      );
    }
}

export default App;
