import "../../styles/dashboard/live-price-bar.css";
import { useEffect, useState } from "react";

export default function LivePriceNewsBar() {
  const [prices, setPrices] = useState<string[]>([]);

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

  return (
    <footer className="live-price-news-bar">
      <div className="news-feed">
        {prices.map((price, index) => (
          <span key={index} className="news-item">
            {price}
          </span>
        ))}
      </div>
    </footer>
  );
}
