import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from 'react-router-dom';
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const { allCoin, currency, isLoading } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  
  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const loadMoreHandler = () => {
    setVisibleCount(prev => prev + 5);
  };

  // Show loading spinner if data is loading
  if (isLoading && allCoin.length === 0) {
    return (
      <div className="home">
        <div className="hero">
          <h1 data-aos="fade-in" className="hero-title">Discover & Track Crypto Instantly</h1>
          <p data-aos="fade-in" className="hero-sub">
            Welcome to CryptoHub — your gateway to real-time prices, trending coins, and powerful analytics. Search any coin and start exploring the world of crypto!
          </p>
          <form data-aos="zoom-in" className="hero-form" onSubmit={searchHandler} autoComplete="off">
            <input
              onChange={inputHandler}
              list="coinlist"
              value={input}
              type="text"
              placeholder="Search for a coin..."
              required
              disabled={isLoading}
            />
            <datalist id="coinlist">
              {allCoin && allCoin.map((item, index) => (<option key={index} value={item.name} />))}
            </datalist>
            <button type="submit" disabled={isLoading}>Search</button>
          </form>
        </div>
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <h1 data-aos="fade-in" className="hero-title">Discover & Track Crypto Instantly</h1>
        <p data-aos="fade-in" className="hero-sub">
          Welcome to CryptoHub — your gateway to real-time prices, trending coins, and powerful analytics. Search any coin and start exploring the world of crypto!
        </p>
        <form data-aos="zoom-in" className="hero-form" onSubmit={searchHandler} autoComplete="off">
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search for a coin..."
            required
            disabled={isLoading}
          />
          <datalist id="coinlist">
            {allCoin && allCoin.map((item, index) => (<option key={index} value={item.name} />))}
          </datalist>
          <button type="submit" disabled={isLoading}>Search</button>
        </form>
      </div>
      
      {isLoading && allCoin.length > 0 ? (
        <div className="table-loading">
          <p>Refreshing data...</p>
          <div className="mini-spinner"></div>
        </div>
      ) : (
        <div className="crypto-table">
          <div data-aos="fade-up" className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24h Change</p>
            <p className="market-cap">Market Cap</p>
          </div>
          {displayCoin.slice(0, visibleCount).map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              className="table-layout"
              key={index} 
              data-aos="fade-up"
            >
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.Symbol}
                {item.current_price.toLocaleString()}
              </p>
              <p
                className={item.price_change_percentage_24h > 0 ? "green" : "red"}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="market-cap">
                {currency.Symbol}
                {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}
          {/* LOAD MORE BUTTON */}
          {visibleCount < displayCoin.length && (
            <div className="load-more">
              <button onClick={loadMoreHandler}>Load More</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;