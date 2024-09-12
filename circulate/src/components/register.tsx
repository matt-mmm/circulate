import React from 'react';

const MarketplacePromo = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh', // Full height of the viewport
            display: 'flex',
            justifyContent: 'flex-start', // Aligns content to the left
            alignItems: 'center', // Vertically center
            paddingLeft: '100px', // Adjust this to control how much to move to the left
            position: 'relative',
            backgroundColor: '#F5F5F5', // Optional background color
        }}>
            <div style={{
                width: 643,
                height: 443,
                position: 'relative',
                background: '#8BD0F8',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column', // Stacks items vertically
                justifyContent: 'center', // Centers vertically
                alignItems: 'center', // Centers horizontally
                padding: '20px', // Adds padding for internal content
                boxShadow: '5px 10px 4px rgba(0, 0, 0, 0.25)',
            }}>
                {/* Text above the button */}
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    color: '#EBF8FF',
                    fontSize: '48px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    lineHeight: '61px',
                    letterSpacing: '1.92px',
                    marginBottom: '20px', // Add margin between the text and button
                }}>
                    Come Browse Our<br/>Free Marketplace
                </div>

                {/* Register button below the text */}
                <div style={{
                    width: '283px',
                    height: '84px',
                    background: '#19C0FD',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '73px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#EBF8FF',
                    fontSize: '24px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    textAlign: 'center',
                }}>
                    Register
                </div>
            </div>
        </div>
    );
};

export default MarketplacePromo;

