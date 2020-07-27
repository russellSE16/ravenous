import React from 'react';
import './Business.css';

class Business extends React.Component {
    render() { 
        return (
            <div className="Business">
                <div className="image-container">
                    <a href={this.props.business.url} target="_blank" rel="noopener noreferrer"><img src={this.props.business.imageSrc} alt=''/></a>
                </div>
                <h2>{this.props.business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        <a 
                            href={`https://www.google.com/maps?q=${this.props.business.latitude},${this.props.business.longitude}`} 
                            target="_blank" 
                            rel="noopener noreferrer">
                            {this.props.business.address}</a>
                        <p>{this.props.business.city}</p>
                        <p>{(this.props.business.state === 'XGL') ? '' : this.props.business.state} {this.props.business.zipCode}</p>
                        <p>{Math.round(this.props.business.distance / 100) / 10}km</p>
                    </div>
                    <div className="Business-reviews">
                        <h3>{this.props.business.category}</h3>
                        <h3 className="rating">{this.props.business.rating} {(this.props.business.rating === 1) ? 'star' : 'stars'}</h3>
                        <p>{this.props.business.reviewCount} {(this.props.business.reviewCount === 1) ? 'review' : 'reviews'}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Business;