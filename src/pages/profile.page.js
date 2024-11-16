import { React, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Spinner from "react-bootstrap/Spinner";
import Body from "../components/body.component";
import ProfileProfile from "../components/profile-profile.component";
import { useUser } from "../contexts/user.provider";

export default function Profile() {
  const { user } = useUser();

  // Načítání aktuálního tab z Local Storage, výchozí hodnota je 0
  const initialTab = localStorage.getItem("profileActiveKey") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Ukládání aktuálního tab do Local Storage při změně
  useEffect(() => {
    localStorage.setItem("profileActiveKey", activeTab);
  }, [activeTab]);

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
    <Body>
      {user ? (
        <Tab.Container defaultActiveKey={activeTab} onSelect={handleSelect} style={{ height: "90%" }}>
          <Row className='h-100'>
            <Col sm={2}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='profile'>Profil</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content className='h-100'>
                <Tab.Pane eventKey='profile'>
                  <ProfileProfile />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      ) : (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
    </Body>
  );
}
