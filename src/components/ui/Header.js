import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ButtonAction } from './ButtonAction';
import Logo from '../img/logo.svg'

export const Header = () => {
  const [points, setPoints] = useState(0);
  const localcookiJarUser = localStorage.getItem("cookijar_user")
  const cookijarUserObject = JSON.parse(localcookiJarUser)


  const getMyPoints = () => {
    fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=true`)
      .then((res) => res.json())
      .then(res => JSON.stringify(setPoints(res.map(res => res.points).reduce((acc, curr) => acc + curr))))
  }

  useEffect(() => {
    getMyPoints()
  }, [])

  return <>
    <Card bg="light" style={{ width: '100%', position: "relative", paddingBlock: ".5rem", justifyContent: "center", alignContent: "space-around", textAlign: "center" }}>
      <Card.Img variant="top" src={Logo} width="800rem" height="800rem" />
      <Card variant="light" className="header">
        <Card.Title>
          <h1>Welcome, {cookijarUserObject.name}!</h1>
        </Card.Title>
        <Card.Subtitle>
          <h3>
            You have {parseInt(points)} points!
          </h3>
        </Card.Subtitle>
      </Card>

    </Card>

  </>
}
export default Header;
