import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

interface OrderedItem {
  category: string;
  quantity: number;
}

interface DataObject {
  orderedItems: OrderedItem[];
  createdAt: string;
}

@Component({
  selector: 'widget-category-yearly',
  template: '<div [chart]="chart"></div>'
})
export class CategoryYearComponent implements OnChanges {
  @Input() orderCategoryYearlyPerformance: any[] = [];

  chart: Chart | undefined;

  ngOnChanges() {
    const filteredData = this.orderCategoryYearlyPerformance.filter(order => order.status === "fulfilled");
    const monthlyData = this.getMonthlyData(filteredData);
    const categories = this.getCategories(monthlyData);
    const seriesData = this.getSeriesData(monthlyData, categories);
    this.updateChart(monthlyData, categories, seriesData);
  }

  getMonthlyData(data: DataObject[]): { month: number; orderedItems: DataObject[] }[] {
    const monthlyData: { month: number; orderedItems: DataObject[] }[] = Array(12).fill(0).map(() => ({ month: -1, orderedItems: [] }));

    data.forEach((obj) => {
      const createdAt = new Date(obj.createdAt);
      const month = createdAt.getMonth();

      monthlyData[month].month = month;
      monthlyData[month].orderedItems.push(obj);
    });

    return monthlyData;
  }

  getCategories(monthlyData: { month: number; orderedItems: DataObject[] }[]): string[] {
    const categories = new Set<string>();

    monthlyData.forEach((monthData) => {
      monthData.orderedItems.forEach((obj) => {
        obj.orderedItems.forEach((item) => {
          categories.add(item.category);
        });
      });
    });

    return Array.from(categories);
  }

  getSeriesData(monthlyData: { month: number; orderedItems: DataObject[] }[], categories: string[]): { name: string; data: number[] }[] {
    const seriesData: { name: string; data: number[] }[] = [];

    monthlyData.forEach((monthData) => {
      const quantities = this.getCategoryQuantities(monthData.orderedItems, categories);
      const totalQuantity = quantities.reduce((sum, quantity) => sum + quantity, 0);

      if (totalQuantity > 0) {
        seriesData.push({
          name: this.getMonthName(monthData.month),
          data: quantities
        });
      }
    });

    return seriesData;
  }

  getCategoryQuantities(orderedItems: DataObject[], categories: string[]): number[] {
    const categoryQuantities: { [category: string]: number } = {};

    categories.forEach((category) => {
      categoryQuantities[category] = 0;
    });

    orderedItems.forEach((obj) => {
      obj.orderedItems.forEach((item) => {
        if (categoryQuantities[item.category]) {
          categoryQuantities[item.category] += item.quantity;
        } else {
          categoryQuantities[item.category] = item.quantity;
        }
      });
    });

    return categories.map((category) => categoryQuantities[category]);
  }

  updateChart(monthlyData: { month: number; orderedItems: DataObject[] }[], categories: string[], seriesData: { name: string; data: number[] }[]) {
    const xAxisData: string[] = monthlyData
      .filter((monthData) => monthData.orderedItems.length > 0)
      .map((monthData) => this.getMonthName(monthData.month))
      .slice(0, new Date().getMonth() + 1);

    const chartSeries = categories.map((category, index) => ({
      name: category,
      type: 'line',
      color: this.getCategoryColor(index),
      data: seriesData.map((data) => data.data[index])
    }));

    const seriesOptions = chartSeries as Highcharts.SeriesOptionsType[];

    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 325
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: 'Category Performance'
      },
      xAxis: {
        categories: xAxisData
      },
      yAxis: {
        title: {
          text: 'No. of Orders'
        }
      },
      series: seriesOptions,
      credits: {
        enabled: false
      }
    });
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return monthNames[month];
  }

  getCategoryColor(index: number): string {
    const colors = [
      '#044342',
      '#7e0505',
      '#ed9e20',
      '#123456',
      '#789012',
      '#abcdef',
      '#fedcba',
      '#246813',
      '#975310',
      '#f0e1d2'
    ];

    return colors[index % colors.length];
  }
}
