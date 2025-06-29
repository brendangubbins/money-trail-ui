import { useEffect, useState } from "react";
import ContributionsStackedAreaChart from './components/contributionAnalytics/contributionsAreaChart';
import ContributionsHistogramChart from "./components/contributionAnalytics/contributionHistogramChart";
import ResultsGrid from './components/contributionSearch/ResultsGrid';
import contributionService from "./services/service";

export default function App() {
  const [stackedAreaChartData, setStackedAreaChartData] = useState([]);
  const [histogramChartData, setHistogramChartData] = useState([]);
  const [choroplethMapData, setChoroplethMapData] = useState([]);

  useEffect(() => {
    contributionService.getStackedAreaChartData().then(setStackedAreaChartData).catch(console.error);
    contributionService.getHistogramChartData().then(setHistogramChartData).catch(console.error);
    contributionService.getContributionByState().then(setChoroplethMapData).catch(console.error);
    console.log(stackedAreaChartData);
    console.log(histogramChartData);
    console.log(choroplethMapData);
  }, []);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif', padding: '0rem' }}>
      
      <div style={{ justifySelf: 'center' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Search Political Contributions</h2>
      </div>

      <div>
        <ResultsGrid />
      </div>

      <div style={{ justifySelf: 'center' }}>
        <h2 style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Analyze Politcal Contributions</h2>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ flex: '1 1 48%', minWidth: 0 }}>
          <ContributionsStackedAreaChart data={stackedAreaChartData} />
        </div>
        <div style={{ flex: '1 1 48%', minWidth: 0 }}>
          <ContributionsHistogramChart data={histogramChartData} />
        </div>
      </div>

    </div>
  );
}
