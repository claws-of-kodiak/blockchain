import { useEffect, useState } from "react";

export default function LivePriceNewsBar() {
  const [prices, setPrices] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Mock fetching crypto prices
    const fetchPrices = async () => {
      const mockPrices = [
        "BTC: $27,000",
        "ETH: $1,800",
        "DOGE: $0.07",
        "ADA: $0.35",
        "SOL: $20.50",
      ];
      setPrices(mockPrices);
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % prices.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [prices]);

  return (
    <div className="live-price-news-bar">
      <div className="news-feed">
        {prices.map((price, index) => (
          <span
            key={index}
            className={`news-item ${index === currentIndex ? "visible" : ""}`}
          >
            {price}
          </span>
        ))}
      </div>
    </div>
  );
}
