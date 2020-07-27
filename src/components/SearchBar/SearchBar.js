import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
            radius: 5000
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviews': 'review_count',
            'Distance' : 'distance'
        };
        this.radiusOptions = {
            '1km': 1000,
            '2km': 2000,
            '5km': 5000,
            '10km': 10000
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.runSearch = this.runSearch.bind(this);
    }
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        }
        else {
            return '';
        }
    }
    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption }, () => {
            //Rerunning the search is performed as a callback to setState otherwise the state is not updated in time to be used in the new search.
            this.runSearch();
        });
    }
    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            const sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li 
                    key={sortByOptionValue}
                    className={this.getSortByClass(sortByOptionValue)} 
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}</li>
            );
        });
    }
    getRadiusClass(radiusOption) {
        if (this.state.radius === radiusOption) {
            return 'active';
        }
        else {
            return '';
        }
    }
    handleRadiusChange(radiusOption) {
        this.setState({ radius: radiusOption }, () => {
            this.runSearch();
        }); 
    }
    renderRadiusOptions() {
        return Object.keys(this.radiusOptions).map(radiusOption => {
            const radiusOptionValue = this.radiusOptions[radiusOption];
            return (
                <li 
                    key={radiusOptionValue + 'm'}
                    className={this.getRadiusClass(radiusOptionValue)} 
                    onClick={this.handleRadiusChange.bind(this, radiusOptionValue)}>
                {radiusOption}</li>
            );
        });
    }
    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }
    handleSearch(event) {
        if(this.state.location) {
            this.runSearch();
        }
        else {
            alert('Please enter a location');
        }
        event.preventDefault();
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSearch(event);
        }
    }
    runSearch() {
        if (this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy, this.state.radius);
        }
    }
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderRadiusOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields" onKeyPress={this.handleKeyPress}>
                    <input 
                        placeholder="Search Businesses"
                        onChange={this.handleTermChange} 
                    />
                    <input 
                        placeholder="Where?"
                        onChange={this.handleLocationChange} 
                    />
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Let's Go</button>
                </div>
            </div>
        );
    }
};

export default SearchBar;