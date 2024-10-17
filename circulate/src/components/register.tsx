import { Link } from "react-router-dom";
import React from "react";

const MarketplacePromo = () => {
    return (
        <>
            <style>{`
                .promo-box:hover {
                    transform: scale(1.1);
                    transition: transform 0.3s ease;
                }
            `}</style>

            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundImage: 'url("/lehigh-background.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 0
                }}></div>
                
                <div className="promo-box" style={{
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
                    zIndex: 1,
                    marginTop: '-50px',
                    transition: 'transform 0.3s ease', // Smooth transition for hover effect
                }}>
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

                    <Link to="/account?action=register" style={{
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
                    }}>
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MarketplacePromo;