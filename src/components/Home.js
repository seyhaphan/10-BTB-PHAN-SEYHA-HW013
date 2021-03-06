import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import PaginationList from './pagination/PaginationList';
import { Form } from 'react-bootstrap';
import swal from 'sweetalert';

export default class Home extends Component {
   constructor() {
      super();
      this.state = {
         loading: true,
         articles: [],
         show: false,
         page: 1,
         limit: 5,
         pagination: {},
      }
   }
   handleClose = () => {
      this.setState({ show: true })
   }

   loadData = () => {
      const { page, limit } = this.state;
      const url = `http://110.74.194.124:15011/v1/api/articles?page=${page}&limit=${limit}`;
      Axios.get(url)
         .then(respone => {
            const data = respone.data.DATA;
            this.setState({
               loading: false,
               articles: data,
               pagination: respone.data.PAGINATION
            })
         })
   }
   onDelete = (id) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this imaginary file!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               Axios.delete(`http://110.74.194.124:15011/v1/api/articles/${id}`)
                  .then(res => {
                     swal(res.data.MESSAGE, {
                        icon: "success",
                     });
                     this.loadData();
                  })

            }
         });

   }
   componentWillMount() {
      this.loadData();
   }
   handlePageChange = (e) => {
      const seleted = e.selected + 1;
      this.setState({
         page: seleted
      }, () => {
         this.loadData();
      });
      console.log(seleted);
   }
   onPageChange = (e) => {
      this.setState({
         limit: e.target.value
      }, () => this.loadData())
   }
   render() {
      if (this.state.loading) return <h2>Loading...</h2>
      return (
         <div>
            <div className="d-flex justify-content-center flex-column m-3">
               <h1 className="m-auto">Article Management</h1>
               <Link className="my-bt" to="/add" >
                  <button className="btn btn-dark">Add New Article</button>
               </Link>
            </div>
            <table className="table table-striped table-hover">
               <thead className="thead-dark">
                  <tr>
                     <th>#</th>
                     <th>TITLE</th>
                     <th>DESCRIPTION</th>
                     <th>CREATE DATE</th>
                     <th>IMAGE</th>
                     <th>ACTION</th>
                  </tr>
               </thead>
               <tbody>
                  {this.state.articles.map(data => {
                     let date = data.CREATED_DATE
                     let year = date.slice(0, 4)
                     let month = date.slice(4, 6)
                     let day = date.slice(6, 8)
                     return (
                        <tr key={data.ID}>
                           <td>{data.ID}</td>
                           <td>
                              <div className="cell">
                                 {data.TITLE}
                              </div>
                           </td>
                           <td>
                              <div className="cell">
                                 {data.DESCRIPTION}
                              </div>
                           </td>
                           <td>
                              <div className="cell-date">
                                 {`${day}-${month}-${year}`}
                              </div>
                           </td>
                           <td>
                              <div style={{ width: 100, height: 100 }}>
                                 <img className="w-100 h-100" src={data.IMAGE || "https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image.png"} alt="profile" />
                              </div>
                           </td>
                           <td>
                              <Link to={`/view/${data.ID}`}>
                                 <button className="btn btn-info m-1">View</button>
                              </Link>
                              <Link to={`/edit/${data.ID}`}>
                                 <button className="btn btn-outline-primary m-1">Edit</button>
                              </Link>
                              <button onClick={() => this.onDelete(data.ID)} className="btn btn-danger m-1">Delete</button>
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
            <div className="d-flex justify-content-end">
               <h5 className="show-page">show page</h5>
               <Form.Control as="select" style={{ width: 100 }} onChange={this.onPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
               </Form.Control>
            </div>
            <div className="d-flex justify-content-center">
               <PaginationList
                  pagination={this.state.pagination}
                  handlePageChange={this.handlePageChange}
               />
            </div>
         </div >
      )
   }
}

