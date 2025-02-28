export const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Friday",
  ],
  datasets: [
    {
      label: "Steps",
      data: [3000, 5000, 4500, 5500, 6500, 7500, 9500],
      borderColor: "rgb(75, 192, 192)",
    },
  ],
};

export const barChartData = {
  labels: [
    "3 Feb a 9 Feb",
    "10 Feb a 16 Feb",
    "17 Feb a 23 Feb",
    "24 Feb a 30 Feb",
  ],
  datasets: [
    {
      label: "Expenses",
      data: [1200, 300, 150, 700],
      borderColor: ["rgb(255, 99, 132, 1)", "rgb(255, 99, 25, 1)"],
      borderWidth: 1,
      backgroundColor: ["rgb(255, 99, 132, 0.7)", "rgb(255, 99, 25, 0.7)"],
    },
  ],
};
