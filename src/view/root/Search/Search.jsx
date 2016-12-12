import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Contact from './Contact';

const testData = [
    'javascript',
    'php',
    'java',
    'python'
];

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };

        this.onSuggestionsFetchRequested    = this.onSuggestionsFetchRequested.bind(this);
        this.getSuggestions                 = this.getSuggestions.bind(this);
        this.onSuggestionsClearRequested    = this.onSuggestionsClearRequested.bind(this);
        this.onChange                       = this.onChange.bind(this);
        this.onSuggestionSelected           = this.onSuggestionSelected.bind(this);
    }
    renderSuggestion(suggestion) {
        return (
            <div className="label">
                {suggestion}
            </div>
        );
    }
    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
    onSuggestionsClearRequested () {
        this.setState({
            suggestions: []
        });
    }
    onSuggestionSelected (event, { suggestion, suggestionValue} ) {
        let value = this.state.value.split(' ');

        if(value.length > 1) {
            value = value.slice(0, -1);
        }else{
            value = [ ];
        }

        value.push(suggestionValue);

        this.setState({
            value: value.join(' ')
        });
    }
    onChange(event, { newValue }) {

        this.setState({
            value: newValue
        });
    }
    getSuggestionValue(suggestion) {
        return suggestion
    }
    getSuggestions(value) {

        const inputValue = value.split(' ').pop().trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : testData.filter(v =>
            v.toLowerCase().slice(0, inputLength) === inputValue
        );

    }
    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input element.
        const inputProps = {
            placeholder: 'Type a skill',
            value,
            onChange: this.onChange
        };
        const theme = {
            input: 'form-control input-lg',
            suggestionsList: 'list-inline'
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Search skills</h2>
                        <div id="custom-search-input">
                            <div className="input-group col-md-12">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                    inputProps={inputProps}
                                    theme={theme}
                                />
                                <span className="input-group-btn" style={{verticalAlign: 'top'}}>
                                    <button className="btn btn-info btn-lg" type="button">
                                        <i className="glyphicon glyphicon-search"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

class Search extends Component {
    render() {
        return (
            <div>
                <div className="App-header">
                    <SearchBar />
                </div>
                <div className="container" style={{paddingTop: '20px'}}>
                    <div className="row">
                        <Contact />
                        <Contact />
                    </div>
                </div>
            </div>
        );
    }
};

export { Search, SearchBar }
