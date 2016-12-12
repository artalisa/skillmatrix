import React, { Component } from 'react';
import './App.css';

import Autosuggest from 'react-autosuggest';

const testData = [
    'javascript',
    'php',
    'java',
    'python'
];
class Contact extends Component {
    render() {
        return (
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="well well-sm">
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <img src="http://placehold.it/380x500" alt="" className="img-rounded img-responsive" />
                            </div>
                            <div className="col-sm-6 col-md-8">
                                <h4>
                                    Bhaumik Patel</h4>
                                <small><cite title="San Francisco, USA">San Francisco, USA <i className="glyphicon glyphicon-map-marker">
                                </i></cite></small>
                                <p>
                                    <i className="glyphicon glyphicon-envelope"></i>email@example.com
                                    <br />
                                    <i className="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">www.jquery2dotnet.com</a>
                                    <br />
                                    <i className="glyphicon glyphicon-gift"></i>June 02, 1988</p>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary">
                                        Social</button>
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                        <span className="caret"></span><span className="sr-only">Social</span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">Twitter</a></li>
                                        <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                        <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#">Github</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
class Search extends Component {
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

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Search />
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
}

export default App;
