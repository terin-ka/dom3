import React, { useState } from "react";
import Body from "../components/body.component";
import HelpOpen from "../components/help-open.component";
import { Modal, Container, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Tooltip } from "react-tooltip";

export default function Home() {
  // Stavy pro otevírání modálů
  const [showModal, setShowModal] = useState(false);
  const [currentHelp, setCurrentHelp] = useState(null);

  // Data pro popisy jednotlivých prvků

  function renderHelpContent() {
    if (currentHelp === 1) {
      return <HelpOpen />;
    } else if (currentHelp === 2) {
      return <></>;
    } else {
      return <></>;
    }
  }

  // Otevření modálu s nápovědou
  const handleHelpClick = (id) => {
    setCurrentHelp(id);
    setShowModal(true);
  };

  return (
    <Body>
      <Container>
        <h1>Interaktivní nápověda</h1>
        <Row>
          {/* Ovládací prvek č. 1 */}
          <Col onClick={() => handleHelpClick(1)}>
            <Badge bg='info' pill>
              1
            </Badge>
            <Button id='my-tooltip' variant='primary'>
              Login Button
            </Button>
          </Col>

          {/* Ovládací prvek č. 2 */}
          <Col data-tip='Klikněte pro nápovědu k vyhledávacímu formuláři' onClick={() => handleHelpClick(2)}>
            <input type='text' placeholder='Search' />
            <sup>2</sup>
          </Col>

          {/* Ovládací prvek č. 3 */}
          <Col data-tip='Klikněte pro nápovědu k panelu' onClick={() => handleHelpClick(3)}>
            <div className='profile-panel'>
              Profile Info <sup>3</sup>
            </div>
          </Col>
        </Row>

        {/* Tooltipy */}
        <Tooltip anchorSelect='#my-tooltip' variant='info' place='right-end' delayShow={500} clickable>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Vyberte zdrojový obrázek</p>
            <Button onClick={() => handleHelpClick(1)} variant='outline-light' size='sm'>
              Nápověda
            </Button>
          </div>
        </Tooltip>

        {/* Modal pro zobrazení popisu prvků */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Nápověda</Modal.Title>
          </Modal.Header>
          <Modal.Body>{renderHelpContent()}</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Zavřít
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Body>
  );
}
