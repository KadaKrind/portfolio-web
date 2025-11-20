// Main Dashboard Application

let charts = {};
let data = [];
let isRealtimeActive = false;
let map = null;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Initializing DataVortex Dashboard...');
    
    data = await dataProcessor.fetchData('main');
    
    initializeCharts();
    initializeDataTable();
    initializeRealtimeStream();
    setupEventListeners();
    
    console.log('Dashboard initialized successfully');
});

// Initialize Charts
function initializeCharts() {
    // Revenue Chart (Chart.js)
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const aggregated = dataProcessor.aggregateByPeriod(data, 'day');
        
        charts.revenue = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: aggregated.map(d => d.date),
                datasets: [{
                    label: 'Revenue',
                    data: aggregated.map(d => d.revenue),
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00d4ff',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#e2e8f0' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#a0aec0' },
                        grid: { color: 'rgba(45, 55, 72, 0.3)' }
                    },
                    x: {
                        ticks: { color: '#a0aec0' },
                        grid: { color: 'rgba(45, 55, 72, 0.3)' }
                    }
                }
            }
        });
    }

    // Source Chart (ApexCharts - Pie)
    if (document.getElementById('sourceChart')) {
        const options = {
            chart: { type: 'donut' },
            labels: ['Direct', 'Organic', 'Social', 'Referral', 'Paid'],
            colors: ['#00d4ff', '#00ff88', '#ffd93d', '#ff6b6b', '#a78bfa'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        labels: {
                            show: true,
                            name: { color: '#e2e8f0' },
                            value: { color: '#00d4ff', fontSize: '16px' }
                        }
                    }
                }
            }
        };
        charts.source = new ApexCharts(document.getElementById('sourceChart'), options);
        charts.source.render();
    }

    // Performance Chart (ApexCharts - Radar)
    if (document.getElementById('performanceChart')) {
        const options = {
            chart: { type: 'radar' },
            series: [{
                name: 'Performance',
                data: [85, 90, 75, 88, 92]
            }],
            labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Features'],
            colors: ['#00d4ff'],
            plotOptions: {
                radar: {
                    size: 140,
                    polygons: {
                        strokeColors: '#2d3748',
                        fill: {
                            colors: ['#16213e', '#1a1f36']
                        }
                    }
                }
            },
            xaxis: { labels: { style: { colors: '#a0aec0' } } },
            yaxis: { labels: { style: { colors: '#a0aec0' } } }
        };
        charts.performance = new ApexCharts(document.getElementById('performanceChart'), options);
        charts.performance.render();
    }

    // Funnel Chart (ApexCharts - Bar)
    if (document.getElementById('funnelChart')) {
        const options = {
            chart: { type: 'bar', stacked: true },
            series: [{
                name: 'Users',
                data: [10000, 7500, 5000, 2500, 1000]
            }],
            labels: ['Page Visit', 'Add to Cart', 'Checkout', 'Payment', 'Confirmed'],
            colors: ['#00d4ff'],
            plotOptions: {
                bar: { horizontal: true, barHeight: '60%' }
            },
            xaxis: { labels: { style: { colors: '#a0aec0' } } },
            yaxis: { labels: { style: { colors: '#a0aec0' } } }
        };
        charts.funnel = new ApexCharts(document.getElementById('funnelChart'), options);
        charts.funnel.render();
    }

    // Forecast Chart with Confidence Intervals
    if (document.getElementById('forecastChart')) {
        const predictions = dataProcessor.predictLinearRegression(data, 30);
        const options = {
            chart: { type: 'area' },
            series: [{
                name: 'Forecast',
                data: predictions.map(p => p.forecast)
            }, {
                name: 'Upper Bound',
                data: predictions.map(p => p.upper)
            }, {
                name: 'Lower Bound',
                data: predictions.map(p => p.lower)
            }],
            colors: ['#00d4ff', '#00ff88', '#ff6b6b'],
            xaxis: {
                categories: predictions.map(p => `Day ${p.day}`),
                labels: { style: { colors: '#a0aec0' } }
            }
        };
        charts.forecast = new ApexCharts(document.getElementById('forecastChart'), options);
        charts.forecast.render();
    }

    // Heatmap
    initializeHeatmap();

    // Live Chart for Real-time Stream
    if (document.getElementById('liveChart')) {
        const options = {
            chart: { type: 'line', animations: { enabled: true } },
            series: [{
                name: 'Real-time Metric',
                data: Array(60).fill(0).map(() => Math.random() * 100)
            }],
            colors: ['#00d4ff'],
            xaxis: {
                type: 'datetime',
                labels: { style: { colors: '#a0aec0' } }
            },
            yaxis: { labels: { style: { colors: '#a0aec0' } } }
        };
        charts.live = new ApexCharts(document.getElementById('liveChart'), options);
        charts.live.render();
    }
}

// Initialize Heatmap
function initializeHeatmap() {
    const container = document.getElementById('heatmapChart');
    if (!container) return;

    let html = '<div class="heatmap-container">';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({length: 24}, (_, i) => i);

    days.forEach(day => {
        html += '<div class="heatmap-row">';
        html += `<span style="width: 40px; color: #a0aec0; font-weight: 600;">${day}</span>`;
        hours.forEach(hour => {
            const intensity = Math.floor(Math.random() * 5) + 1;
            html += `<div class="heatmap-cell heatmap-intensity-${intensity}" title="Hour ${hour}"></div>`;
        });
        html += '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
}

// Initialize DataTable
function initializeDataTable() {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;

    data.slice(0, 10).forEach(item => {
        const row = `
            <tr>
                <td>${item.date}</td>
                <td>$${(item.revenue / 1000).toFixed(1)}K</td>
                <td>${(item.users / 1000).toFixed(1)}K</td>
                <td>${item.conversion.toFixed(2)}%</td>
                <td>$${item.avgOrder.toFixed(2)}</td>
                <td><span class="badge bg-success">Active</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Initialize DataTables plugin
    $('#dataTable').DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        dom: 'Bfrtip',
        buttons: ['csv', 'excel', 'pdf']
    });
}

// Initialize Real-time Stream
function initializeRealtimeStream() {
    realtimeEngine.subscribe(update => {
        if (isRealtimeActive) {
            document.getElementById('streamSessions').textContent = update.sessions;
            document.getElementById('streamEvents').textContent = update.events;
            document.getElementById('streamResponseTime').textContent = update.responseTime + 'ms';
        }
    });
}

// Switch Views
function switchView(view) {
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`view-${view}`).classList.add('active');

    // Initialize map when geo view is activated
    if (view === 'geomaps' && !map) {
        initializeMap();
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.menu-item').classList.add('active');
}

// Initialize Map
function initializeMap() {
    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add markers for data points
    const locations = [
        {lat: 51.5, lng: -0.09, city: 'London', value: '125K users'},
        {lat: 48.85, lng: 2.35, city: 'Paris', value: '95K users'},
        {lat: 52.52, lng: 13.40, city: 'Berlin', value: '85K users'}
    ];

    locations.forEach(loc => {
        L.circleMarker([loc.lat, loc.lng], {
            radius: 15,
            fillColor: '#00d4ff',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`<strong>${loc.city}</strong><br>${loc.value}`).addTo(map);
    });
}

// Toggle Real-time
function toggleRealtime() {
    isRealtimeActive = !isRealtimeActive;
    if (isRealtimeActive) {
        realtimeEngine.startStream();
        document.getElementById('realtimeStatus').textContent = 'Stop Real-time';
    } else {
        realtimeEngine.stopStream();
        document.getElementById('realtimeStatus').textContent = 'Start Real-time';
    }
}

// Refresh Data
function refreshData() {
    console.log('Refreshing data...');
    dataProcessor.cache.clear();
    location.reload();
}

// Apply Filters
function applyFilters() {
    console.log('Applying filters...');
}

// Update Date Range
function updateDateRange() {
    console.log('Date range updated');
}

// Export Data
function exportData() {
    const csv = 'Date,Revenue,Users,Conversion\n' + 
        data.map(d => `${d.date},$${d.revenue},$${d.users},${d.conversion}%`).join('\n');
    
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-export.csv';
    a.click();
}

// Toggle Sidebar
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Toggle Settings
function toggleSettings() {
    alert('Settings panel would open here');
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        console.log('Searching:', e.target.value);
    });

    window.addEventListener('resize', () => {
        Object.values(charts).forEach(chart => {
            if (chart && chart.chart) {
                chart.chart.resize();
            }
        });
    });
}
