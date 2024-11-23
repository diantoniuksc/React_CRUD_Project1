import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useUserContext } from './UserContext.tsx';


const apiKeyUnsplash = 'De_KjgAf6qDr_Fpb6PUCvsv5uLpP0MmONRvogEpI1BY'; // Unsplash API Key

const FillImageBox: React.FC = () => {

  const { selectedUserThoughts } = useUserContext();
  const [thoughts, setThoughts] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (selectedUserThoughts) {
        try {
          setThoughts(thoughts);
          getUnsplashImages(selectedUserThoughts);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [selectedUserThoughts]);

  const [imageResults, setImageResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customQuery, setCustomQuery] = useState(''); // New state for user search input
  const [inputValue, setInputValue] = useState('');

  // Function to fetch images from Unsplash
  const getUnsplashImages = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKeyUnsplash}`);
      if (response.data.results.length > 0) {
        console.log('it worked');
        setImageResults(response.data.results);
        setSelectedImage(response.data.results[0].urls.regular);  // Set the first image as default
      } else {
        setError(`No images found for "${query}".`);
        setImageResults([]);
      }
    } catch (error) {
      setError('Error fetching Unsplash images.');
    } finally {
      setLoading(false);
    }
  };

  const selectImage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    if (selectedIndex) {
      setSelectedImage(imageResults[selectedIndex].urls.regular);
    } else {
      setSelectedImage('');
    }
  };

  const handleCustomSearch = async () => {
    if (customQuery) {
      await getUnsplashImages(customQuery);
    }
  };

  const handleInputChange = async(event) => {
    setInputValue(event.target.value);
    await getUnsplashImages(inputValue);
  };

  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>World Capitals</title>
        <link rel="icon" href="icon.png" type="image/png" />
      </head>
      <body>
        <div className="container">
          <InputBase
              sx={{ ml: 1, flex: 1, backgroundColor: '#f0f0f0',  borderRadius: '4px', padding: '5px 10px' }}
              placeholder="Find an inspiration"
              inputProps={{ 'aria-label': 'inspiration' }}
              value={inputValue}
              onChange={handleInputChange}            
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleCustomSearch}>
            <SearchIcon />
          </IconButton>
          
          <div id="images-menu-container" style={{ display: imageResults.length > 0 ? 'block' : 'none' }}>
            <select id="images-menu" onChange={selectImage}>
              <option value="">Select an image</option>
              {imageResults.map((image, index) => (
                <option key={index} value={index}>
                  {image.alt_description || `Image ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className="picture-title">
            {selectedImage && <img id="background-image" src={selectedImage} alt="Background" style={{ display: 'block', borderRadius: '10px', marginTop: '20px' }} />}
            <p id="description"></p>
          </div>

          <div id="error-message" className="error-message">{error}</div>
          {loading && <p id="loading">Loading...</p>}
        </div>
      </body>
    </div>
  );
};

export default FillImageBox;
	