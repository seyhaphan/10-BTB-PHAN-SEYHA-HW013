import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { storage } from '../../firebase'
import swal from 'sweetalert'

export default class EditArticle extends Component {
   constructor(props) {
      super(props)
      this.state = {
         title: '',
         description: '',
         error: '',
         image: '',
         url: '',
         uploading: false,
         uploadSuccess: false,
         progress: 0
      }
      this.id = this.props.match.params.eId;
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
            error: " * Title can't be blank"
         })
      } else {
         const article = {
            TITLE: this.state.title,
            DESCRIPTION: this.state.description,
            IMAGE: this.state.url
         }
         Axios.put(`http://110.74.194.124:15011/v1/api/articles/${this.id}`, article)
            .then(res => {
               swal("success!", res.data.MESSAGE, "success")
                  .then(() => {
                     this.props.history.push("/")
                  })
               this.props.history.push("/")
            })
            .catch(err => alert(err))
      }
   }
   laodData = () => {
      const url = `http://110.74.194.124:15011/v1/api/articles/${this.id}`;
      Axios.get(url)
         .then(({ data }) => {
            const post = data.DATA;
            this.setState({
               loading: false,
               title: post.TITLE,
               description: post.DESCRIPTION,
               url: post.IMAGE
            })
         })
   }
   componentWillMount() {
      this.laodData();
   }
   handleChange = (e) => {
      if (e.target.files[0]) {
         this.setState({
            image: e.target.files[0],
         }, () => {
            this.setState({ uploading: true })
            const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
               "state_changed",
               snapshot => {
                  const progress = Math.round(
                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  this.setState({ progress })
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
         })
      }
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
                        rows="4"
                        placeholder="Eneter Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange} />
                     <Form.Text className="text-danger">
                        {this.state.error}
                     </Form.Text>
                  </Form.Group>
                  <Button variant="warning" type="submit">
                     Update Article
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
                     {
                        this.state.uploading ? <span>Uplaoding...</span> : this.state.uploadSuccess ? <span>Completed {this.state.progress}%</span> : ""
                     }
                  </div>
               </div>
            </Col>
         </Row>
      )
   }
}
