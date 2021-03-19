import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileCard = props => {
    return (
        <ContentLoader
            style={{ width: "100%" }}
            speed={1}
            width={450}
            height={400}
            viewBox="0 0 450 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="120" y="53" rx="0" ry="0" width="2" height="300" />
            <rect x="370" y="55" rx="0" ry="0" width="2" height="300" />
            <rect x="120" y="53" rx="0" ry="0" width="250" height="2" />
            <rect x="120" y="353" rx="0" ry="0" width="250" height="2" />
            <circle cx="245" cy="147" r="44" />
            <rect x="122" y="53" rx="0" ry="0" width="250" height="41" />
            <rect x="160" y="207" rx="0" ry="0" width="160" height="9" />
            <rect x="200" y="236" rx="0" ry="0" width="92" height="9" />
            <rect x="170" y="324" rx="0" ry="0" width="146" height="51" />
        </ContentLoader>
    );
};

export default ProfileCard;