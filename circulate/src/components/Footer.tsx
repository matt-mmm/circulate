import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#2B303A',
        display: 'flex',
        color: '#FFFFFF',
        padding: '20px 0',
        position: 'relative',
        bottom: 0,
        left: 0,
        // Make sure the footer sticks to the bottom when content height is less than viewport
        minHeight: '100px', // Give a height to the footer
      }}
    >
      <Container fluid>
        <div
          style={{
            paddingLeft: "77px",
            paddingRight: "10px",
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Evenly space the contents
            flexWrap: 'wrap', // Wrap contents on smaller screens
          }}
        >
        <Image
            src="/aws-logo1.png" // Ensure the correct path to your AWS logo image
            alt="AWS Logo"
            style={{ height: '50px', marginRight: '15px' }}
            fluid
        />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <div>
              <h5>Built with:</h5>
              <ul className="list-unstyled mb-0">
                <li>React | TypeScript | React Bootstrap</li>
                <li>OpenAI API | AWS</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Gemhallics. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;