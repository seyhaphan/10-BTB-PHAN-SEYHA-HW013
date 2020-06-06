import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Form, Button, Nav, FormControl } from 'react-bootstrap'

export default function Menu() {
   return (
      <Navbar bg="dark" variant="dark">
         <Container>
            <Navbar.Brand as={Link} to="/" >AMS</Navbar.Brand>
            <Nav className="mr-auto">
               <Nav.Link as={Link} to="/home" >Home</Nav.Link>
            </Nav>
            <Form inline>
               <FormControl type="text" placeholder="Search" className="mr-sm-2" />
               <Button variant="outline-info">Search</Button>
            </Form>
         </Container>
      </Navbar>
   )
}
