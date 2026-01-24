import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Package,
  ArrowUp,
  ArrowDown,
  Calendar,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
} from 'lucide-react';

const useStyles = createUseStyles({
  container: {
    padding: '2rem',
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontWeight: '600',
  },
  statIconWrapper: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  positive: { color: '#10B981' },
  negative: { color: '#EF4444' },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
  },
  chartHeader: {
    marginBottom: '1.5rem',
  },
  chartTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.25rem',
  },
  chartSubtitle: {
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  barChart: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: '250px',
    padding: '1rem 0',
    gap: '0.75rem',
  },
  barWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    background: 'linear-gradient(180deg, #4F46E5 0%, #6366F1 100%)',
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: 'linear-gradient(180deg, #4338CA 0%, #4F46E5 100%)',
      transform: 'scaleY(1.02)',
    },
  },
  barLabel: {
    fontSize: '0.75rem',
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  barValue: {
    position: 'absolute',
    top: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#4F46E5',
    whiteSpace: 'nowrap',
  },
  tableCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
    marginBottom: '2rem',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
    borderBottom: '2px solid #E5E7EB',
  },
  th: {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #F3F4F6',
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  productName: {
    fontWeight: '600',
    color: '#111827',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  badgeSuccess: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  badgeDanger: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  deviceCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.75rem',
    marginBottom: '0.75rem',
    border: '1px solid #E5E7EB',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  },
  deviceIcon: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.25rem',
  },
  deviceStat: {
    fontSize: '0.85rem',
    color: '#6B7280',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#E5E7EB',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginTop: '0.5rem',
  },
  progressFill: {
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.3s ease',
  },
});

const DashboardMonitoring = () => {
  const classes = useStyles();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    pageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topPages, setTopPages] = useState([]);

  const initGoogleAnalytics = useCallback(() => {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && !window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          send_page_view: true
        });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  const trackPageView = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Dashboard Monitoring',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  const trackEvent = useCallback((category, action, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  const fetchDashboardData = useCallback(() => {
    setTimeout(() => {
      setStats({
        totalRevenue: 45750000,
        totalOrders: 284,
        totalUsers: 1247,
        totalProducts: 156,
        pageViews: 15420,
        uniqueVisitors: 8934,
        avgSessionDuration: 325,
        bounceRate: 42.5,
      });

      setRevenueData([
        { name: 'Sen', value: 45, label: 'Senin' },
        { name: 'Sel', value: 52, label: 'Selasa' },
        { name: 'Rab', value: 38, label: 'Rabu' },
        { name: 'Kam', value: 61, label: 'Kamis' },
        { name: 'Jum', value: 48, label: 'Jumat' },
        { name: 'Sab', value: 35, label: 'Sabtu' },
        { name: 'Min', value: 29, label: 'Minggu' },
      ]);

      setDeviceData([
        { name: 'Desktop', value: 55, color: '#4F46E5', icon: Monitor },
        { name: 'Mobile', value: 35, color: '#10B981', icon: Smartphone },
        { name: 'Tablet', value: 10, color: '#F59E0B', icon: Globe },
      ]);

      setTopProducts([
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          views: 1247,
          conversions: 127,
          revenue: 25400000,
        },
        {
          id: 2,
          name: 'Samsung Galaxy S24',
          views: 1098,
          conversions: 98,
          revenue: 19600000,
        },
        {
          id: 3,
          name: 'MacBook Air M3',
          views: 856,
          conversions: 76,
          revenue: 15200000,
        },
        {
          id: 4,
          name: 'AirPods Pro Gen 2',
          views: 2145,
          conversions: 234,
          revenue: 11700000,
        },
        {
          id: 5,
          name: 'iPad Pro 12.9"',
          views: 645,
          conversions: 54,
          revenue: 10800000,
        },
      ]);

      setTopPages([
        { path: '/list-products', views: 4523, avgTime: '3:45', bounce: 35.2 },
        { path: '/', views: 3821, avgTime: '2:15', bounce: 42.8 },
        { path: '/add-products', views: 2145, avgTime: '5:30', bounce: 28.5 },
        {
          path: '/product/detail',
          views: 1876,
          avgTime: '4:20',
          bounce: 31.7,
        },
        { path: '/login', views: 1234, avgTime: '1:50', bounce: 55.3 },
      ]);

      trackEvent('Dashboard', 'load', 'Dashboard Loaded', 1);
    }, 0);
  }, [trackEvent]);

  useEffect(() => {
    initGoogleAnalytics();
    fetchDashboardData();
    trackPageView();
  }, [initGoogleAnalytics, fetchDashboardData, trackPageView]);

  const statCards = [
    {
      label: 'Total Pendapatan',
      value: `Rp ${stats.totalRevenue.toLocaleString('id-ID')}`,
      change: 12.5,
      icon: DollarSign,
      color: '#10B981',
      bgColor: '#D1FAE5',
    },
    {
      label: 'Total Pesanan',
      value: stats.totalOrders.toLocaleString('id-ID'),
      change: 8.3,
      icon: ShoppingCart,
      color: '#4F46E5',
      bgColor: '#EEF2FF',
    },
    {
      label: 'Tayangan Halaman',
      value: stats.pageViews.toLocaleString('id-ID'),
      change: 15.2,
      icon: Eye,
      color: '#7C3AED',
      bgColor: '#F3E8FF',
    },
    {
      label: 'Pengunjung Unik',
      value: stats.uniqueVisitors.toLocaleString('id-ID'),
      change: 10.8,
      icon: Users,
      color: '#EC4899',
      bgColor: '#FCE7F3',
    },
    {
      label: 'Durasi Sesi Rata-rata',
      value: `${Math.floor(stats.avgSessionDuration / 60)}:${(stats.avgSessionDuration % 60).toString().padStart(2, '0')}`,
      change: 5.4,
      icon: Clock,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      label: 'Bounce Rate',
      value: `${stats.bounceRate}%`,
      change: -3.2,
      icon: Activity,
      color: '#06B6D4',
      bgColor: '#CFFAFE',
    },
    {
      label: 'Total Produk',
      value: stats.totalProducts.toLocaleString('id-ID'),
      change: -2.1,
      icon: Package,
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
    },
    {
      label: 'Konversi Rate',
      value: '3.8%',
      change: 2.3,
      icon: TrendingUp,
      color: '#14B8A6',
      bgColor: '#CCFBF1',
    },
  ];

  const maxValue = Math.max(...revenueData.map((d) => d.value)) || 1;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>Dashboard Monitoring & Analytics</h1>
        <p className={classes.subtitle}>
          <Calendar size={16} />
          {new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className={classes.statsGrid}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={classes.statCard}
              onClick={() =>
                trackEvent('Dashboard', 'click_stat', stat.label, 1)
              }
            >
              <div className={classes.statHeader}>
                <span className={classes.statLabel}>{stat.label}</span>
                <div
                  className={classes.statIconWrapper}
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon size={24} color={stat.color} />
                </div>
              </div>
              <div className={classes.statValue}>{stat.value}</div>
              <div
                className={`${classes.statChange} ${stat.change >= 0 ? classes.positive : classes.negative}`}
              >
                {stat.change >= 0 ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
                {Math.abs(stat.change)}% dari bulan lalu
              </div>
            </div>
          );
        })}
      </div>

      <div className={classes.chartsGrid}>
        <div className={classes.chartCard}>
          <div className={classes.chartHeader}>
            <h3 className={classes.chartTitle}>Aktivitas Mingguan</h3>
            <p className={classes.chartSubtitle}>
              Distribusi aktivitas per hari dalam seminggu
            </p>
          </div>
          <div className={classes.barChart}>
            {revenueData.map((item, index) => (
              <div key={index} className={classes.barWrapper}>
                <div
                  className={classes.bar}
                  style={{ height: `${(item.value / maxValue) * 80}%` }}
                  onClick={() =>
                    trackEvent('Chart', 'click_bar', item.label, item.value)
                  }
                >
                  <span className={classes.barValue}>{item.value}</span>
                </div>
                <span className={classes.barLabel}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.chartCard}>
          <div className={classes.chartHeader}>
            <h3 className={classes.chartTitle}>Perangkat Pengguna</h3>
            <p className={classes.chartSubtitle}>
              Distribusi pengguna berdasarkan perangkat
            </p>
          </div>
          <div>
            {deviceData.map((device, index) => {
              const DeviceIcon = device.icon;
              return (
                <div
                  key={index}
                  className={classes.deviceCard}
                  onClick={() =>
                    trackEvent('Device', 'click', device.name, device.value)
                  }
                >
                  <div
                    className={classes.deviceIcon}
                    style={{ backgroundColor: `${device.color}20` }}
                  >
                    <DeviceIcon size={24} color={device.color} />
                  </div>
                  <div className={classes.deviceInfo}>
                    <div className={classes.deviceName}>{device.name}</div>
                    <div className={classes.deviceStat}>
                      {device.value}% dari total pengunjung
                    </div>
                    <div className={classes.progressBar}>
                      <div
                        className={classes.progressFill}
                        style={{
                          width: `${device.value}%`,
                          backgroundColor: device.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={classes.tableCard}>
        <div className={classes.chartHeader}>
          <h3 className={classes.chartTitle}>Produk Terpopuler</h3>
          <p className={classes.chartSubtitle}>
            Berdasarkan tayangan dan konversi
          </p>
        </div>
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr>
              <th className={classes.th}>Produk</th>
              <th className={classes.th}>Tayangan</th>
              <th className={classes.th}>Konversi</th>
              <th className={classes.th}>Rate</th>
              <th className={classes.th}>Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => {
              const conversionRate = (
                (product.conversions / product.views) *
                100
              ).toFixed(1);
              return (
                <tr
                  key={product.id}
                  onClick={() => trackEvent('Product', 'view', product.name, 1)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className={`${classes.td} ${classes.productName}`}>
                    {product.name}
                  </td>
                  <td className={classes.td}>
                    {product.views.toLocaleString('id-ID')}
                  </td>
                  <td className={classes.td}>{product.conversions}</td>
                  <td className={classes.td}>
                    <span
                      className={`${classes.badge} ${
                        conversionRate >= 10
                          ? classes.badgeSuccess
                          : conversionRate >= 5
                            ? classes.badgeWarning
                            : classes.badgeDanger
                      }`}
                    >
                      {conversionRate}%
                    </span>
                  </td>
                  <td className={classes.td}>
                    Rp {product.revenue.toLocaleString('id-ID')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={classes.tableCard}>
        <div className={classes.chartHeader}>
          <h3 className={classes.chartTitle}>Halaman Terpopuler</h3>
          <p className={classes.chartSubtitle}>
            Analisis performa halaman website
          </p>
        </div>
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr>
              <th className={classes.th}>Halaman</th>
              <th className={classes.th}>Tayangan</th>
              <th className={classes.th}>Waktu Rata-rata</th>
              <th className={classes.th}>Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((page, index) => (
              <tr
                key={index}
                onClick={() =>
                  trackEvent('Page', 'view', page.path, page.views)
                }
                style={{ cursor: 'pointer' }}
              >
                <td className={`${classes.td} ${classes.productName}`}>
                  {page.path}
                </td>
                <td className={classes.td}>
                  {page.views.toLocaleString('id-ID')}
                </td>
                <td className={classes.td}>{page.avgTime}</td>
                <td className={classes.td}>
                  <span
                    className={`${classes.badge} ${
                      page.bounce < 40
                        ? classes.badgeSuccess
                        : page.bounce < 50
                          ? classes.badgeWarning
                          : classes.badgeDanger
                    }`}
                  >
                    {page.bounce}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMonitoring;
