import PortfolioHolding from './PortfolioHoldingInterface';

interface Portfolio {
    userId: number;
    firstName: string;
    lastName: string;
    cash: number;
    netAssets: number;
    totalGain: number;
    daysGain: number;
    portfolioHolding: PortfolioHolding[];
}

export default Portfolio; 