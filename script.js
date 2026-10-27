
// =========================
// 1. Monthly Sales Data
// =========================

const monthlyData = [
    { month: 'Jan', revenue: 1300, units: 3500 },
    { month: 'Feb', revenue: 1220, units: 3600 },
    { month: 'Mar', revenue: 1420, units: 3800 },
    { month: 'Apr', revenue: 1575, units: 4000 },
    { month: 'May', revenue: 1520, units: 4200 },
    { month: 'Jun', revenue: 1675, units: 4400 }
];

const branchData = [
    { branch: 'Colombo', revenue: 2450 },
    { branch: 'Kandy', revenue: 1250 },
    { branch: 'Galle', revenue: 1110 }
];


// =========================
// 2. Format Numbers
// =========================

function formatNumber(number) {
    return number.toLocaleString('en-US');
}


// =========================
// 3. Calculate KPI Values
// =========================

const totalRevenue = monthlyData.reduce(
    (total, item) => total + item.revenue, 0
);

const totalUnits = monthlyData.reduce(
    (total, item) => total + item.units, 0
);

const bestMonth = monthlyData.reduce(
    (best, item) => item.revenue > best.revenue ? item : best
);

const bestBranch = branchData.reduce(
    (best, item) => item.revenue > best.revenue ? item : best
);

document.getElementById('totalRevenue').textContent =
    'LKR ' + formatNumber(totalRevenue) + 'K';

document.getElementById('totalUnits').textContent =
    formatNumber(totalUnits);

document.getElementById('bestMonth').textContent =
    bestMonth.month;

document.getElementById('bestMonthRevenue').textContent =
    'LKR ' + formatNumber(bestMonth.revenue) + 'K revenue';

document.getElementById('bestBranch').textContent =
    bestBranch.branch;

document.getElementById('bestBranchRevenue').textContent =
    'LKR ' + formatNumber(bestBranch.revenue) + 'K revenue';


// =========================
// 4. Chart Theme Colors
// =========================

function getChartColors() {
    const isDark = document.body.classList.contains('dark-mode');

    return {
        text: isDark ? '#d7e8e1' : '#476d7c',
        grid: isDark ? '#344744' : '#e1ece8',
        title: isDark ? '#b9d9cd' : '#315d91',
        tooltipBackground: isDark ? '#263b39' : '#ffffff',
        tooltipText: isDark ? '#e5f5ed' : '#064b46',
        tooltipBorder: isDark ? '#47645c' : '#dcebe2'
    };
}


// =========================
// 5. Create Monthly Chart
// =========================

const monthlyCanvas = document.getElementById('monthlyChart');

const monthlyChart = new Chart(monthlyCanvas, {
    type: 'line',

    data: {
        labels: monthlyData.map(item => item.month),

        datasets: [{
            label: 'Revenue (LKR thousands)',
            data: monthlyData.map(item => item.revenue),

            borderColor: '#168b65',
            backgroundColor: 'rgba(22, 139, 101, 0.12)',
            fill: true,
            tension: 0.35,

            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#168b65'
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                enabled: true,
                padding: 12,
                displayColors: false,

                callbacks: {
                    label: function(context) {
                        return 'Revenue: LKR ' +
                            formatNumber(context.parsed.y) + 'K';
                    }
                }
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                },

                grid: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                title: {
                    display: true,
                    text: 'Revenue (LKR thousands)'
                },

                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('en-US');
                    }
                }
            }
        }
    }
});


// =========================
// 6. Create Branch Chart
// =========================

const branchCanvas = document.getElementById('branchChart');

const branchChart = new Chart(branchCanvas, {
    type: 'bar',

    data: {
        labels: branchData.map(item => item.branch),

        datasets: [{
            label: 'Revenue (LKR thousands)',
            data: branchData.map(item => item.revenue),

            backgroundColor: [
                '#168b65',
                '#438fcb',
                '#e9a23b'
            ],

            borderRadius: 7,
            maxBarThickness: 65
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                enabled: true,
                padding: 12,
                displayColors: false,

                callbacks: {
                    label: function(context) {
                        return 'Revenue: LKR ' +
                            formatNumber(context.parsed.y) + 'K';
                    }
                }
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Branch'
                },

                grid: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                title: {
                    display: true,
                    text: 'Revenue (LKR thousands)'
                },

                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('en-US');
                    }
                }
            }
        }
    }
});


// =========================
// 7. Update Chart Colors
// =========================

function updateChartTheme() {
    const colors = getChartColors();

    Chart.defaults.color = colors.text;

    [monthlyChart, branchChart].forEach(function(chart) {

        chart.options.scales.x.ticks.color = colors.text;
        chart.options.scales.y.ticks.color = colors.text;

        chart.options.scales.x.title.color = colors.title;
        chart.options.scales.y.title.color = colors.title;

        chart.options.scales.x.grid.color = colors.grid;
        chart.options.scales.y.grid.color = colors.grid;

        chart.options.plugins.tooltip.backgroundColor =
            colors.tooltipBackground;

        chart.options.plugins.tooltip.titleColor =
            colors.tooltipText;

        chart.options.plugins.tooltip.bodyColor =
            colors.tooltipText;

        chart.options.plugins.tooltip.borderColor =
            colors.tooltipBorder;

        chart.options.plugins.tooltip.borderWidth = 1;

        chart.update();
    });
}


// =========================
// 8. Dark / Light Mode
// =========================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);

    themeIcon.className = isDark
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';

    themeToggle.title = isDark
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';

    themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );

    updateChartTheme();
}

// Restore the previously selected theme
const savedTheme = localStorage.getItem('lankaFreshMartTheme');

setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', function() {

    const isDark = !document.body.classList.contains('dark-mode');

    setTheme(isDark);

    localStorage.setItem(
        'lankaFreshMartTheme',
        isDark ? 'dark' : 'light'
    );
});


// =========================
// 9. Mobile Navigation
// =========================

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
}

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
});

sidebarOverlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.nav-link').forEach(function(link) {

    link.addEventListener('click', function() {

        document.querySelectorAll('.nav-link').forEach(function(item) {
            item.classList.remove('active');
        });

        link.classList.add('active');

        closeSidebar();
    });
});


// =========================
// 10. Initial Chart Theme
// =========================

updateChartTheme();
