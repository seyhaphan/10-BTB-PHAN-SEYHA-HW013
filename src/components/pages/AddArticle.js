import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { storage } from '../../firebase'

export default class AddArticle extends Component {
   constructor() {
      super()
      this.state = {
         title: '',
         description: '',
         error: '',
         image: '',
         url: '',
         uploading: false,
         uploadSuccess: false
      }
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value,
         error: ''
      })
   }
   onSubmit = (e) => {
      e.preventDefault();
      if (this.state.title === '' || this.state.description === '') {
         this.setState({
            error: "* Title can't be blank"
         })
      } else {
         const article = {
            TITLE: this.state.title,
            DESCRIPTION: this.state.description,
            IMAGE: this.state.url
         }
         Axios.post("http://110.74.194.124:15011/v1/api/articles", article)
            .then(res => {
               alert(res.data.MESSAGE)
               this.props.history.push("/")
            })
            .catch(err => alert(err))
      }
   }
   handleChange = (e) => {
      if (e.target.files[0]) {
         this.setState({
            image: e.target.files[0],
         })
      }
   }
   handleUplaod = () => {
      this.setState({ uploading: true })
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on(
         "state_changed",
         snapshot => {
            const progress = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
         },
         error => {
            console.log(error);
         },
         () => {
            storage
               .ref("images")
               .child(this.state.image.name)
               .getDownloadURL()
               .then(url => {
                  this.setState({
                     url,
                     uploading: false,
                     uploadSuccess: true
                  })
               });
         }
      );
   }
   render() {
      return (
         <Row>
            <Col md={8}>
               <Form onSubmit={this.onSubmit}>
                  <Form.Group>
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange} />
                     <Form.Text className="text-danger">
                        {this.state.error}
                     </Form.Text>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows="2"
                        placeholder="Eneter Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange} />
                     <Form.Text className="text-danger">
                        {this.state.error}
                     </Form.Text>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                     Submit
                     </Button>
               </Form>
            </Col>
            <Col md={4}>
               <div className="d-flex flex-column">
                  <input className="p-2" type="file" onChange={this.handleChange} />
                  <div className="img-box p-2">
                     <img className="w-100 h-100" src={this.state.url || "https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image.png"} alt="profile" />
                  </div>
                  <div className="inline-block p-2">
                     <button className="w-25" onClick={this.handleUplaod}>uplaod</button>
                     {
                        this.state.uploading ? <span>Uplaoding...</span> : this.state.uploadSuccess ? <span>Completed</span> : ""
                     }
                  </div>
               </div>
            </Col>
         </Row>
      )
   }
}
