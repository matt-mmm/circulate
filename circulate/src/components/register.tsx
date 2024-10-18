import React from 'react';
import ProductCarousel from "../components/ProductCarousel.tsx";

const MarketplacePromo = () => {
    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            backgroundImage: 'url(/Lehigh-background.jpg)', // Ensure correct image path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '0',
        }}>
            
            {/* Overlay for opacity effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.4)', // Lighter opacity for better readability
                zIndex: 0
            }}></div>
            
            {/* Centered and enlarged register box with additional content */}
            <div style={{
                width: '90%',
                maxWidth: '850px', // Slightly larger box
                position: 'relative',
                background: '#2B303A',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px', // Increase padding for larger look
                boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
                zIndex: 1, // Ensure content is above the overlay
                marginBottom: '200px', // Space below the box
                marginTop: '130px', // Space above the box
            }}>
                {/* Text above the button */}
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '42px', // Large font size
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '52px',
                    letterSpacing: '1.5px',
                    marginBottom: '20px', // Space below the title
                }}>
                    From Lehigh students<br />for you!
                </div>

                {/* Additional description below the title */}
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    lineHeight: '28px',
                    marginBottom: '40px', // Add space below the description
                }}>
                    Discover a wide variety of goods from fellow students. <br />
                    Sign up now to browse!
                </div>

                {/* Register button linking to Cognito Hosted UI */}
                <a 
                    href= "https://circulatesignup.auth.us-east-2.amazoncognito.com/login?client_id=6sttjboiag1ha957tqt9lha4q8&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback" 
                    style={{
                        width: '300px', // Make the button larger
                        height: '80px',
                        background: '#565857',
                        borderRadius: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        textAlign: 'center',
                        textDecoration: 'none',
                        boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease', // Smooth hover transition for scaling
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Slightly enlarge on hover
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset on hover out
                >
                    Sign Up Now!
                </a>
            </div>

            {/* Carousel section with grey background */}
            <div style={{
                width: '100%',
                backgroundColor: '#565857', // Light grey background for the carousel section
                padding: '0px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
            }}>
                <div style={{ width: '100%' }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '0px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#333',
                    }}>
                    </h2>
                    <ProductCarousel />
                </div>
            </div>
        </div>
    );
};

export default MarketplacePromo;