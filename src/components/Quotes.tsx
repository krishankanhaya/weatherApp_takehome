import { useEffect, useState } from "react";
import { getQuotes } from "../apis/getQuotes";

type Quote = {
  quote: string;
  author: string;
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote | null>(null);

  useEffect(() => {
    const getNewQuotes = async () => {
      const res = await getQuotes();
      setQuotes(res);
    };
    getNewQuotes();
  }, []);

  return (
    <div className="my-4 border rounded p-2">
      <h2 className="text-center font-semibold text-[1.2rem]">
        Quotes of the Day
      </h2>
      <p className="mt-2 text-center">{quotes?.quote}</p>
      <p className="text-gray-400 text-center">--{quotes?.author}--</p>
    </div>
  );
};

export default Quotes;
