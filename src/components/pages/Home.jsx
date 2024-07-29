import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useArticlesContext } from '../hooks/useArticlesContext';

// API KEY
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const Home = () => {
  // state for select
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  // State for loading
  const [loading, setLoading] = useState(true);
  // Initiate useNavigate
  const navigate = useNavigate()
  // bring in state and dispatch
  const{ articles, dispatch} = useArticlesContext()

  // use effect
  useEffect(() => {
    // Set loading to true:
    setLoading(true);
    // fetch function
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?language=en&country=${country}&category=${category}&apiKey=${apiKey}`);
        console.log(response.data.articles);
        // setArticles(response.data.articles);
        dispatch({type: 'GET_ARTICLES', payload: response.data.articles})
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(true)
      }
    };
    fetchArticles();
  }, [country, category]);

  // handle country change
  const handleCountryChange = (event) => {
    let newCountry = event.target.value;
    setCountry(newCountry);
  };

  // handle category change
  const handleCategoryChange = (event) => {
    let newCategory = event.target.value;
    setCategory(newCategory);
  };

  const handleReadMoreClick = (index) => {
    console.log(index);
    navigate(`/article/${index}`)
  }

  // mapped articles component
  const Articles = ({articles}) => {
    const mappedArticles = articles.map((article, index) => {
      // map return
      return (
        <div key={index} className='article'>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <button onClick={() => handleReadMoreClick(index)}>Read More</button>
        </div>
      )
    })
    // Articles Component return:
    return (
      <>
        {mappedArticles}
      </>
    )
  }

  return (
    <div className='home-container'>
      <div className='filters-container'>
        {/* Country filters */}
        <div className='filter-flex-container'>
          <label htmlFor="country-select"> Country</label>
          <select name='country-select' id='country-select' onChange={handleCountryChange}>
            <option value="">Any</option>
            <option value="us">USA</option>
            <option value="gb">UK</option>
            <option value="au">Australia</option>
            <option value="nz">NZ</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className='filter-flex-container'>
          <label htmlFor="category-select"> Category</label>
          <select name='category-select' id='category-select' onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>
      {/* end of filters */}

      <div className='article-container'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Articles articles={articles} />
        )}
      </div>

    </div>
  );
};

export default Home;
