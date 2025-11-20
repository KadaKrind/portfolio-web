// Advanced Data Processing Engine

class DataProcessor {
    constructor() {
        this.data = [];
        this.processedData = [];
        this.cache = new Map();
    }

    // Fetch and process data
    async fetchData(source) {
        if (this.cache.has(source)) {
            return this.cache.get(source);
        }
        
        try {
            const response = await fetch(`data/sample-data.json`);
            this.data = await response.json();
            this.cache.set(source, this.data);
            return this.data;
        } catch (error) {
            console.error('Data fetch error:', error);
            return this.generateMockData();
        }
    }

    // Generate mock data for demo
    generateMockData() {
        const data = [];
        for (let i = 0; i < 30; i++) {
            data.push({
                date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
                revenue: Math.random() * 100000 + 50000,
                users: Math.floor(Math.random() * 50000 + 50000),
                conversion: Math.random() * 5 + 2,
                avgOrder: Math.random() * 100 + 100,
                sessions: Math.floor(Math.random() * 10000 + 50000),
                events: Math.floor(Math.random() * 50000 + 100000),
                responseTime: Math.random() * 500 + 100
            });
        }
        return data.reverse();
    }

    // Aggregation functions
    aggregateByPeriod(data, period = 'day') {
        const grouped = {};
        
        data.forEach(item => {
            const key = period === 'day' ? item.date : item.date.substring(0, 7);
            if (!grouped[key]) {
                grouped[key] = {
                    revenue: 0,
                    users: 0,
                    conversion: 0,
                    count: 0
                };
            }
            grouped[key].revenue += item.revenue;
            grouped[key].users += item.users;
            grouped[key].conversion += item.conversion;
            grouped[key].count++;
        });

        return Object.keys(grouped).map(key => ({
            date: key,
            revenue: grouped[key].revenue / grouped[key].count,
            users: grouped[key].users / grouped[key].count,
            conversion: grouped[key].conversion / grouped[key].count
        }));
    }

    // Predictive analysis using linear regression
    predictLinearRegression(data, days = 30) {
        const values = data.map(d => d.revenue);
        const n = values.length;
        
        const xs = Array.from({length: n}, (_, i) => i);
        const sumX = xs.reduce((a, b) => a + b, 0);
        const sumY = values.reduce((a, b) => a + b, 0);
        const sumXY = xs.reduce((sum, x, i) => sum + x * values[i], 0);
        const sumX2 = xs.reduce((sum, x) => sum + x * x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        const predictions = [];
        for (let i = n; i < n + days; i++) {
            predictions.push({
                day: i - n + 1,
                forecast: intercept + slope * i,
                lower: (intercept + slope * i) * 0.9,
                upper: (intercept + slope * i) * 1.1
            });
        }
        return predictions;
    }

    // Anomaly detection
    detectAnomalies(data, threshold = 2) {
        const mean = data.reduce((a, b) => a + b.revenue, 0) / data.length;
        const std = Math.sqrt(
            data.reduce((a, b) => a + Math.pow(b.revenue - mean, 2), 0) / data.length
        );

        return data.map(item => ({
            ...item,
            isAnomaly: Math.abs(item.revenue - mean) > threshold * std,
            zscore: (item.revenue - mean) / std
        }));
    }

    // Correlation analysis
    calculateCorrelation(data, field1, field2) {
        const values1 = data.map(d => d[field1]);
        const values2 = data.map(d => d[field2]);

        const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
        const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

        const numerator = values1.reduce((sum, v1, i) => 
            sum + (v1 - mean1) * (values2[i] - mean2), 0);
        
        const denominator = Math.sqrt(
            values1.reduce((sum, v1) => sum + Math.pow(v1 - mean1, 2), 0) *
            values2.reduce((sum, v2) => sum + Math.pow(v2 - mean2, 2), 0)
        );

        return numerator / denominator;
    }

    // Cohort analysis
    performCohortAnalysis(data) {
        const cohorts = {};
        
        data.forEach(item => {
            const month = item.date.substring(0, 7);
            if (!cohorts[month]) cohorts[month] = [];
            cohorts[month].push(item);
        });

        return Object.keys(cohorts).map(month => ({
            cohort: month,
            size: cohorts[month].length,
            avgRevenue: cohorts[month].reduce((sum, d) => sum + d.revenue, 0) / cohorts[month].length,
            retention: Math.random() * 100
        }));
    }
}

const dataProcessor = new DataProcessor();
