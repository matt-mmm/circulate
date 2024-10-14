import React from 'react';

const MarketplacePromo = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '100px',
            position: 'relative',
            backgroundImage: 'url("/lehigh-background.jpg")', // Update with the correct path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            {/* Overlay for opacity effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the opacity here
                zIndex: 0
            }}></div>
            
            <div style={{
                width: 643,
                height: 443,
                position: 'relative',
                background: '#8BD0F8',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                boxShadow: '5px 10px 4px rgba(0, 0, 0, 0.25)',
                zIndex: 1 // Ensures content is above the overlay
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
                    marginBottom: '20px',
                }}>
                    Come Browse Our<br/>Free Marketplace
                </div>

                {/* Register button linking to Cognito Hosted UI */}
                <a 
                    href="https://circulatesignup.auth.us-east-2.amazoncognito.com/login?client_id=6sttjboiag1ha957tqt9lha4q8&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000" 
                    style={{
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
                        textDecoration: 'none',
                    }}
                >
                    Register
                </a>
            </div>
        </div>
    );
};

export default MarketplacePromo;
