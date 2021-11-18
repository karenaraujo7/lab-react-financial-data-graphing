import axios from 'axios';
import {useState, useEffect} from 'react';
import Chart from "chart.js/auto";

export default function Graph() {
    const [priceData, setPriceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get ("http://api.coindesk.com/v1/bpi/historical/close.json")
            .then((response) => {
                setPriceData({...response.data.bpi});
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading) {
          function renderChart() {
            const ctx = document.getElementById("myCanvas").getContext("2d");
    
            if (chart) {
              chart.destroy();
            }
    
            const chartInstance = new Chart(ctx, {
              type: "line",
              data: {
                labels: Object.keys(priceData).reverse(), 
                datasets: [
                  {
                    label: "Preço de fechamento $MSFT",
                    data: Object.values(priceData),
                       
                    borderColor: "#0330fc",
                    backgroundColor: "#03b1fc",
                    fill: true,
                  },
                ],
              },
            });
    
            setChart(chartInstance);
          }
    
          renderChart();
        }
      }, [loading, priceData]);
    
      return <div>{loading ? "Carregando..." : <canvas id="myCanvas" />}</div>;

}