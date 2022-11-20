import React, { Component } from 'react'
import Loading from './Loading';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 12,
        category: 'General',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0
        }
    }


    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ff890afea844141a8fee5862ab36ad6&page=${this.state.page}&pageSize=12`;
        const data = await fetch(url);
        const parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles });
    }

    async componentDidMount() {
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ff890afea844141a8fee5862ab36ad6&page=${this.state.page}&pageSize=12`;
        const data = await fetch(url);
        this.props.setProgress(30);
        const parsedData = await data.json();
        console.log(parsedData);
        this.props.setProgress(60);
        this.setState({
            articles: parsedData.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
        this.props.setProgress(100);

    }
    // PrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }
    // NextClick = async () => {
    //     if (this.state.page + 1 > Math.floor(this.state.totalResults / 12)) {

    //     } else {

    //         this.setState({ page: this.state.page + 1 });
    //         this.updateNews();
    //     }
    // }
    render() {
        return (
            <>
                <div className='container m-auto p-auto'>
                    <div className='container mx-4 p-auto ' style={{ color: "white" }} >
                        <h2><strong><hr />HEADLINES<hr /></strong></h2>
                        {this.state.loading && <Loading />}
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length !== this.state.totalResults}
                            loader={<Loading />}
                        >

                            <div className='container'>

                                <div className='row'>

                                    {/*!this.state.loading &&*/ this.state.articles.map((element) => {
                                        return <div className='col-md-4' key={element.url} >
                                            <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                                        </div>
                                    })}

                                </div>
                            </div>
                        </InfiniteScroll>



                        {/* <div className="container d-flex justify-content-between">
                            <button type="button" disabled={(this.state.page) <= 1} onClick={this.PrevClick} className="btn btn-success">&larr;Previous</button>
                            <button type="button" disabled={this.state.page + 1 > Math.floor(this.state.totalResults / 12)} onClick={this.NextClick} className="btn btn-success">Next&rarr;</button>

                        </div> */}
                    </div>
                </div>
            </>
        )
    }
}

export default News