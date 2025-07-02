import React, {useState, useEffect} from "react";
import ApiHandler from "../Api/ApiHandlerClass";
const fallbackQuote = "You are free, and that is why you are lost.";
const fallbackQuoteAuthor = "Franz Kafka";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ZenQuote = () => {
    const [quote, setQuote] = useState(fallbackQuote);
    const [quoteAuthor, setQuoteAuthor] = useState(fallbackQuoteAuthor);
    useEffect(() => {
        const fetchQuote = async () => {
          try {
            const url = `${BASE_URL}/api/quote`;
            const data = await ApiHandler.getQuote(url);
  
            if (data) {
              const quote = data[0].q;
              const quoteAuthor = data[0].a;
              setQuote(quote);
              setQuoteAuthor(quoteAuthor);
            }
          } catch (error) {
          
          }
        };
  
        fetchQuote();
      }, []);
      return (
        <>
            <h5>"{quote}"</h5>
            <h5>"{quoteAuthor}"</h5>
        </>
      )
}
//style={{ color: "black", marginLeft: "65px" }}
//style={{ color: "black", marginLeft: "140px", marginTop: "25px" }}
export default ZenQuote;
