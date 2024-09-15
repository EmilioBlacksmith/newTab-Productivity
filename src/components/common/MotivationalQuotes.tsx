import { useEffect, useState } from "react";
import quotesData from "../../assets/quotes.json";

export function MotivationalQuotes() {
	const [motivationalQuote, setMotivationalQuote] = useState({
		quote: "",
		author: "",
	});

	useEffect(() => {
		const quotes = quotesData.quotes;
		const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

		setMotivationalQuote(randomQuote());

		const interval = setInterval(() => {
			setMotivationalQuote(randomQuote());
		}, 30000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="font-bold text-center text-shadow-lg">
			<p className="max-w-xl mx-auto break-words">
				"{motivationalQuote.quote}"
			</p>
			<p className="text-gray-600">- {motivationalQuote.author}</p>
		</div>
	);
}
