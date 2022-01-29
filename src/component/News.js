import React, { Component } from 'react';
import Newsitem from './Newsitem';

export default class News extends Component {

    constructor()
    {
      super();
      console.log("hello");
      this.state={
      articles:[],
      loading:false,
      page:1,
      }
    }
    async componentDidMount()
    {
      let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c83c272377614c33abef3ed317ae100b&page=1&pageSize=20";
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({articles : parsedData.articles,totalResults:parsedData.totalResults})
    } 
    handleNextClick= async()=>{
      if(this.state.page+1>Math.ceil(this.state.totalResults/20))
      {

      }
      else
      {
      console.log("next");
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c83c272377614c33abef3ed317ae100b&page=${this.state.page+1}&pageSize=20`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({
        page:this.state.page+1,
        articles : parsedData.articles,
      })
    }
    }
    handlePreviousClick=async()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c83c272377614c33abef3ed317ae100b&page=${this.state.page-1}&pageSize=20`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({
        page:this.state.page-1,
        articles : parsedData.articles,
      })
    }
render() {
 
    return <div className="container my-3">
      <h2>Newspaper-Top Heading</h2>
      <div className="row my-3">
        { this.state.articles.map((element)=>{
        return <div className="col-md-4 my-3" key={element.url}>
          <Newsitem title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,88) : ""} imageurl={element.urlToImage} newsurl={element.url}/>
        </div>
        })}
    </div>
    <div className="container d-flex justify-content-between">
    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
    </div>
    </div>
  }
}
