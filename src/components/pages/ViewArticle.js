import React, { Component } from 'react'
import Axios from 'axios'

export default class ViewArticle extends Component {
   state = {
      article: {},
      loading: true
   }
   componentWillMount() {
      const id = this.props.match.params.vId;
      const url = `http://110.74.194.124:15011/v1/api/articles/${id}`;
      Axios.get(url)
         .then(({ data }) => {
            const post = data.DATA;
            this.setState({
               loading: false,
               article: post
            })
         })
   }
   render() {
      const { article, loading } = this.state;
      if (loading) return <h2>Loading...</h2>
      return (
         <React.Fragment>
            <h2>Article</h2>
            <div className="card mb-3">
               <div className="row no-gutters ">
                  <div className="col-md-4 " >
                     <img src={article.IMAGE || "https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image.png"} className="card-img h-100" alt="..." />
                  </div>
                  <div className="col-md-8 ">
                     <div className="card-body">
                        <h5 className="card-title">{article.TITLE}</h5>
                        <p className="card-text">{article.DESCRIPTION}</p>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
   }
}
