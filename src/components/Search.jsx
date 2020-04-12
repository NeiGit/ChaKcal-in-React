import React, { Component } from 'react';
import '../css/Search.css'
import '../css/Common.css'
import RequestManager from '../services/RequestManager'
class Search extends Component {
    state = { 
        foodQuery : '',
        quantityQuery : 100,
        fetching : false
    }
    render() { 
        return ( 
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <h1><span className="badge badge-secondary search-bar-badge"> ChaKcal in REACT </span></h1>
                        <form className="form-inline ml-auto" onSubmit = {this.submitSearch}>
                            <div className="md-form my-0">
                                {/* Spinner */}
                                <div class="sk-chase" style = {this.state.fetching ? {display : 'block'} : {display: 'none'}}>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                </div>
                                <input className="form-control mr-sm-2" type="text" placeholder="Food" aria-label="Search" onChange={this.searchInputChanged}></input>

                                <input className="form-control mr-sm-2" type="text" placeholder="grs" aria-label="grs" onChange={this.quantityInputChanged}></input>
                            </div>
                            <button className= "btn btn-outline-info btn-md my-2 my-sm-2 badge badge-secondary search-bar-button" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
         );
    }

    /******************** FUNCTIONS *****************************/
    searchInputChanged = e => {
        this.setState({
            foodQuery : e.target.value,
        })

    }


    quantityInputChanged = e => {
        this.setState({
            quantityQuery : e.target.value
        })
    }

    submitSearch = e => {
        e.preventDefault()
        console.log(this.state.fetching)
        const {foodQuery} = this.state

        if (foodQuery === '') {
            return alert ('Empty query')
        }

        this.showSpinner()

        // If 0 or less is input as quantity, default 100 value is set
        const finalQuantity = this.state.quantityQuery >= 0 ? this.state.quantityQuery : 100

        const promiseId = RequestManager.fetchId(foodQuery)
        promiseId.then(foodId => {
            if (foodId === undefined){
                alert(`No results found for ${foodQuery}`)
                this.hideSpinner()
            } else {
                const nutritionChartPromise = RequestManager.handleDualEntryRequest(foodId, finalQuantity)
                nutritionChartPromise.then(nutritionChart => {
                    // Add id and label attributes before passing to parent component
                    nutritionChart.food = {
                        id : foodId,
                        label : foodQuery
                    }
                    this.props.handleSearch(nutritionChart)
                    this.hideSpinner()
                })
                
            }    
        })
    }

    showSpinner = () => {
        this.setState({
            fetching : true
        })
    }

    hideSpinner = () => {
        this.setState({
            fetching : false
        })
    }
}
 
export default Search;