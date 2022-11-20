import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imgUrl, newsUrl } = this.props
        return (
            <div>
                <div className="card my-5" style={{ color: 'black', width: "aut", height: "auto", backgroundColor: "pink", boxShadow: "10px 10px brown" }}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body" ><hr />
                        <h5 className="card-title">{title}<hr /></h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItems