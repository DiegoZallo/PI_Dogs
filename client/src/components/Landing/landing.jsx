import { Link } from "react-router-dom";

const Landing =()=>{
    const backgroundStyle = {
        backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:720/format:webp/1*c196HEeranTmro7DEk-ABQ.jpeg)', // Replace 'your-image-url.jpg' with the actual image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Adjust the height as needed
    };
    const textStyles = {
        position: 'absolute',
        top: '50%', // Adjust this value to vertically center the text
        left: '50%', // Adjust this value to horizontally center the text
        transform: 'translate(-50%, -50%)', // Center the text both vertically and horizontally
        color: 'white', // Set the text color
        fontSize: '24px', // Adjust the font size as needed
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change background color
        padding: '190px', // Add some padding
        borderRadius: '8px', 
    };

    

    return (
        <div style={backgroundStyle}>
            <Link to='/home'><span style={textStyles}>Welcome to Dogs World</span></Link>
        </div>
    );
};

export default Landing