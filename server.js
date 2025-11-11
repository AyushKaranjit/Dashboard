const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Dashboard data
const dashboardData = {
  charts: [
    {
      id: "order_status_summary",
      type: "column",
      title: "Order Status Overview",
      description: "Summary of all order statuses in the selected period.",
      total_orders: 2,
      data: {
        Open: 0,
        Initiated: 0,
        Received: 0,
        Processing: 0,
        "Re-Processing": 0,
        Cancelled: 1,
        Completed: 1,
        "Failed Attempt": 0,
        "Return To Vendor": 0,
        "Delivered To Vendor": 0,
      },
    },
    {
      id: "delivered_order_summary",
      type: "line",
      title: "Delivered Order Trend",
      description:
        "Delivered orders aggregated over time (daily, weekly, or monthly).",
      total_delivered_orders: 1,
      data: [
        { date: "2025-11-05", day: "Wed", delivered_orders: 0 },
        { date: "2025-11-06", day: "Thu", delivered_orders: 0 },
        { date: "2025-11-07", day: "Fri", delivered_orders: 1 },
        { date: "2025-11-08", day: "Sat", delivered_orders: 0 },
        { date: "2025-11-09", day: "Sun", delivered_orders: 0 },
        { date: "2025-11-10", day: "Mon", delivered_orders: 0 },
        { date: "2025-11-11", day: "Tue", delivered_orders: 0 },
      ],
    },
    {
      id: "delivery_curve",
      type: "area",
      title: "Today's Delivery Curve",
      description:
        "Shows how deliveries are distributed throughout the day by time",
      data: [
        { time: "01:28", actual: 1, target: 0.5, forecast: 0.8 },
        { time: "08:54", actual: 2, target: 1, forecast: 1.5 },
        { time: "09:15", actual: 4, target: 1.5, forecast: 2 },
        { time: "09:56", actual: 5, target: 2, forecast: 2.5 },
        { time: "10:13", actual: 3, target: 2.5, forecast: 3 },
        { time: "10:37", actual: 2, target: 3, forecast: 3.5 },
        { time: "10:50", actual: 3, target: 3.5, forecast: 4 },
        { time: "11:03", actual: 7, target: 4, forecast: 4.5 },
        { time: "11:20", actual: 25, target: 4.5, forecast: 5 },
        { time: "11:39", actual: 7, target: 5, forecast: 5.5 },
        { time: "12:04", actual: 5, target: 5.5, forecast: 6 },
        { time: "12:20", actual: 3, target: 6, forecast: 6.5 },
        { time: "12:33", actual: 2, target: 6.5, forecast: 7 },
        { time: "12:46", actual: 5, target: 7, forecast: 7.5 },
        { time: "12:55", actual: 3, target: 7.5, forecast: 8 },
        { time: "13:06", actual: 7, target: 8, forecast: 8.5 },
        { time: "13:15", actual: 4, target: 8.5, forecast: 9 },
        { time: "13:25", actual: 3, target: 9, forecast: 9.5 },
        { time: "13:37", actual: 2, target: 9.5, forecast: 10 },
        { time: "13:50", actual: 5, target: 10, forecast: 10.5 },
        { time: "14:01", actual: 6, target: 10.5, forecast: 11 },
        { time: "14:12", actual: 4, target: 11, forecast: 12 },
        { time: "14:21", actual: 6, target: 12, forecast: 13 },
        { time: "14:32", actual: 8, target: 12.5, forecast: 13.5 },
        { time: "14:41", actual: 7, target: 13, forecast: 14 },
        { time: "14:50", actual: 5, target: 14, forecast: 15 },
        { time: "14:59", actual: 10, target: 14.5, forecast: 16 },
        { time: "15:08", actual: 8, target: 15, forecast: 17 },
        { time: "15:17", actual: 9, target: 16, forecast: 18 },
        { time: "15:26", actual: 12, target: 16.5, forecast: 19 },
        { time: "15:36", actual: 10, target: 17, forecast: 20 },
        { time: "15:45", actual: 9, target: 18, forecast: 21 },
        { time: "15:54", actual: 8, target: 19, forecast: 22 },
        { time: "16:03", actual: 6, target: 20, forecast: 23 },
        { time: "16:12", actual: 9, target: 21, forecast: 24 },
        { time: "16:21", actual: 8, target: 22, forecast: 25 },
      ],
    },
    {
      id: "revenue_trend",
      type: "area",
      title: "Revenue Trend",
      description: "Tracks revenue changes and patterns over time",
      data: [
        { month: "Jan", revenue: 20000 },
        { month: "Feb", revenue: 48000 },
        { month: "Mar", revenue: 50000 },
        { month: "Apr", revenue: 55000 },
        { month: "May", revenue: 58000 },
        { month: "Jun", revenue: 80000 },
        { month: "Jul", revenue: 75000 },
        { month: "Aug", revenue: 82000 },
        { month: "Sep", revenue: 90000 },
        { month: "Oct", revenue: 95000 },
        { month: "Nov", revenue: 98000 },
        { month: "Dec", revenue: 120000 },
      ],
    },
    {
      id: "peak_order_hours",
      type: "column",
      title: "Peak Order Hours",
      description: "Identifies the busiest times of day for incoming orders",
      data: [
        { timeSlot: "8-10 AM", orders: 120 },
        { timeSlot: "10-12 PM", orders: 200 },
        { timeSlot: "12-2 PM", orders: 180 },
        { timeSlot: "2-4 PM", orders: 250 },
        { timeSlot: "4-6 PM", orders: 305 },
        { timeSlot: "6-8 PM", orders: 220 },
      ],
    },
    {
      id: "orders_valley_comparison",
      type: "donut",
      title: "Orders: Inside vs Outside Valley",
      description:
        "Compares order distribution between valley and outer regions",
      data: [
        { name: "Inside Valley", orders: 850 },
        { name: "Outside Valley", orders: 390 },
      ],
    },
    {
      id: "rto_reasons",
      type: "donut",
      title: "Return to Origin Reasons",
      description:
        "Shows why packages were returned before successful delivery",
      data: [
        { reason: "Customer Not Available", count: 50 },
        { reason: "Wrong Address", count: 25 },
        { reason: "Rejected", count: 10 },
        { reason: "Damaged", count: 8 },
      ],
    },
  ],
  cards: {
    number_cards: [
      {
        id: "total_customers",
        title: "Total customers",
        value: "40,689",
        currency: "",
        icon: "users",
        color: "purple",
        trend: {
          direction: "up",
          percentage: "+2.5%",
          label: "Up from yesterday",
        },
      },
      {
        id: "total_orders",
        title: "Total Orders",
        value: "10,293",
        currency: "",
        icon: "package",
        color: "yellow",
        trend: {
          direction: "up",
          percentage: "+1.3%",
          label: "Up from yesterday",
        },
      },
      {
        id: "total_balance_receivable",
        title: "Total Revenue",
        value: "2,900.00",
        currency: "NPR",
        icon: "wallet",
        color: "green",
        trend: {
          direction: "down",
          percentage: "-1.3%",
          label: "Down from yesterday",
        },
      },
      {
        id: "total_pending",
        title: "Total Pending",
        value: "2,040",
        currency: "",
        icon: "history",
        color: "orange",
        trend: {
          direction: "neutral",
          percentage: "0%",
          label: "from yesterday",
        },
      },
    ],
    list_cards: [
      {
        id: "cod_summary",
        title: "COD Summary",
        description:
          "Cash on Delivery report for pending and collected amounts.",
        details: {
          "Last COD Amount": 823,
          "Last COD Date": "2025-07-31 11:48:46",
          "Pending COD Amount": "2,900.00",
        },
      },
    ],
  },
  tables: {
    delivery_statistics: {
      id: "delivery_statistics",
      title: "Delivery Statistics",
      description:
        "Overview of key delivery metrics and performance indicators",
      data: [
        { id: "pending-pickups", title: "Pending Pickups", value: "18" },
        { id: "cancelled-orders", title: "Cancelled Orders", value: "5" },
        { id: "high-value-orders", title: "High Value Orders", value: "12" },
        { id: "delayed-orders", title: "Delayed Orders", value: "7" },
        {
          id: "delivery-performance",
          title: "Delivery Performance",
          value: "92%",
          footer: "Orders delivered on time",
        },
        {
          id: "repeat-customers",
          title: "Repeat Customers",
          value: "43%",
          footer: "of total customers",
        },
        {
          id: "avg-delivery-hours",
          title: "Avg Delivery Hours (Inside Valley)",
          value: "26h",
        },
        {
          id: "customer-satisfaction",
          title: "Customer Satisfaction",
          value: "4.6",
          footer: "Average rating",
        },
      ],
    },
    top_destinations: {
      id: "top_destinations",
      title: "Top 5 Destinations",
      description: "Most frequent delivery locations by order volume",
      data: [
        { rank: 1, name: "Kathmandu", orders: 450, avgDeliveryHours: 26 },
        { rank: 2, name: "Bhaktapur", orders: 200, avgDeliveryHours: 28 },
        { rank: 3, name: "Pokhara", orders: 150, avgDeliveryHours: 30 },
        { rank: 4, name: "Biratnagar", orders: 130, avgDeliveryHours: 32 },
        { rank: 5, name: "Lalitpur", orders: 120, avgDeliveryHours: 25 },
      ],
    },
  },
};

// Helper function to create standardized response
const createResponse = (
  data,
  message = "Data fetched successfully",
  fromCache = false
) => {
  return {
    message: {
      status: "success",
      message: message,
      from_cache: fromCache,
      data: data,
    },
  };
};

// Routes
// GET - Retrieve full delivery dashboard data
app.get("/api/dashboard", (req, res) => {
  res.json(
    createResponse(dashboardData, "Combined report fetched successfully", false)
  );
});

// GET - Retrieve summary metrics
app.get("/api/dashboard/summary", (req, res) => {
  res.json(
    createResponse(
      { cards: { number_cards: dashboardData.cards.number_cards } },
      "Summary metrics fetched successfully"
    )
  );
});

// GET - Retrieve charts
app.get("/api/dashboard/charts", (req, res) => {
  res.json(
    createResponse(
      { charts: dashboardData.charts },
      "Charts data fetched successfully"
    )
  );
});

// GET - Retrieve specific chart by ID
app.get("/api/dashboard/charts/:chartId", (req, res) => {
  const chart = dashboardData.charts.find((c) => c.id === req.params.chartId);
  if (chart) {
    res.json(
      createResponse(
        { chart },
        `Chart '${req.params.chartId}' fetched successfully`
      )
    );
  } else {
    res.status(404).json({
      message: {
        status: "error",
        message: "Chart not found",
        data: null,
      },
    });
  }
});

// GET - Retrieve cards
app.get("/api/dashboard/cards", (req, res) => {
  res.json(
    createResponse(
      { cards: dashboardData.cards },
      "Cards data fetched successfully"
    )
  );
});

// GET - Retrieve all tables
app.get("/api/dashboard/tables", (req, res) => {
  res.json(
    createResponse(
      { tables: dashboardData.tables },
      "Tables data fetched successfully"
    )
  );
});

// GET - Retrieve delivery statistics table
app.get("/api/dashboard/delivery-statistics", (req, res) => {
  res.json(
    createResponse(
      { table: dashboardData.tables.delivery_statistics },
      "Delivery statistics fetched successfully"
    )
  );
});

// GET - Retrieve top destinations table
app.get("/api/dashboard/top-destinations", (req, res) => {
  res.json(
    createResponse(
      { table: dashboardData.tables.top_destinations },
      "Top destinations fetched successfully"
    )
  );
});

// GET - Retrieve COD summary
app.get("/api/dashboard/cod-summary", (req, res) => {
  res.json(
    createResponse(
      { cod_summary: dashboardData.cards.list_cards[0] },
      "COD summary fetched successfully"
    )
  );
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    message: {
      status: "success",
      message: "Delivery Dashboard API is running",
      data: { uptime: process.uptime(), timestamp: new Date().toISOString() },
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Delivery Dashboard API is running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /api/dashboard - Full dashboard data`);
  console.log(`  GET /api/dashboard/summary - Summary metrics`);
  console.log(`  GET /api/dashboard/charts - All charts`);
  console.log(`  GET /api/dashboard/charts/:chartId - Specific chart`);
  console.log(`  GET /api/dashboard/cards - All cards`);
  console.log(`  GET /api/dashboard/tables - All tables`);
  console.log(
    `  GET /api/dashboard/delivery-statistics - Delivery statistics table`
  );
  console.log(`  GET /api/dashboard/top-destinations - Top destinations table`);
  console.log(`  GET /api/dashboard/cod-summary - COD summary card`);
  console.log(`  GET /health - Health check`);
});

module.exports = app;
