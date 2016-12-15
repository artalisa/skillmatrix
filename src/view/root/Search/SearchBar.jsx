import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/searchActions';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };

        this.onSuggestionsFetchRequested    = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested    = this.onSuggestionsClearRequested.bind(this);
        this.onChange                       = this.onChange.bind(this);
        this.onSuggestionSelected           = this.onSuggestionSelected.bind(this);
    }
    renderSuggestion(suggestion) {
        return (
            <div className="label">
                {suggestion.name}
            </div>
        );
    }
    onSuggestionsFetchRequested({ value }) {
        const inputValue = value.split(' ').pop().trim().toLowerCase();
        return this.props.getSuggestions(inputValue);
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
        return suggestion.name
    }
    onClickSearch(event) {
        event.preventDefault();
        return this.props.findUsers(this.state.value);
    }
    render() {
        const value = this.state.value;
        const suggestions = this.props.suggestions;
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
                                    <button className="btn btn-info btn-lg" type="button" onClick={this.onClickSearch.bind(this)}>
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

const mapReduxStateToProps = function(rstate) {
    return {
        suggestions: rstate.search.searchSuggestions
    }
}

const mapReduxDispatchToProps = function(dispatch) {
    return {
        getSuggestions: function(searchPart) { dispatch(actions.getSearchSkills(searchPart)); },
        findUsers: function(searchSkills) { dispatch(actions.getUsers(searchSkills)); }
    }
}

export default connect(mapReduxStateToProps, mapReduxDispatchToProps)(SearchBar)
