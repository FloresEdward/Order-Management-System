// /*
import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
interface DataObject {
  orderedItems: {
    category: string;
    quantity: number;
  }[];
}

@Component({
  selector: 'widget-category-performance',
  template: '<div [chart]="chart"></div>'
})

export class CategoryPerformanceComponent implements OnChanges {
  @Input() orderCategoryPerformance: any[] = [];

  chart: Chart | undefined;
  filteredFulfilledData: any[] = [];
  colors: string[] = [
    '#044342',
    '#7e0505',
    '#ed9e20',
    '#6920fb',
    '#121212',
  ];

  ngOnChanges() {
    this.filteredFulfilledData = this.orderCategoryPerformance.filter(order => order.status === "fulfilled");
    const topCategories = this.getTopCategories(this.filteredFulfilledData);
    this.updateChart(topCategories, this.colors);
  }
  
  getTopCategories(data: DataObject[]): { category: string; totalQuantity: number; color: string }[] {
    const categoryMap: { [category: string]: number } = {};
    data.forEach((obj) => {
      obj.orderedItems.forEach((item) => {
        if (categoryMap[item.category]) {
          categoryMap[item.category] += item.quantity;
        } else {
          categoryMap[item.category] = item.quantity;
        }
      });
    });
  
    const sortedCategories = Object.keys(categoryMap).sort(
      (a, b) => categoryMap[b] - categoryMap[a]
    );
  
    const topCategories = sortedCategories.slice(0, 6).map((category, index) => ({
      category,
      totalQuantity: categoryMap[category],
      color: this.colors[index],
    }));
  
    return topCategories;
  }

  updateChart(topCategories: { category: string; totalQuantity: number; color: string }[], colors: string[]) {
    const xAxisCategories = topCategories.map((category) => category.category);
    const seriesData = topCategories.map((category) => ({
      y: category.totalQuantity,
      color: category.color
    }));

    this.chart = new Chart({
      chart: {
        type: 'bar',
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: 'Category Performance'
      },
      xAxis: {
        categories: xAxisCategories
      },
      yAxis: {
        title: {
          text: 'Quantity order per month'
        }
      },
      series: [
        {
          type: 'bar',
          data: seriesData
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
// */

/*
import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

interface DataObject {
  orderedItems: {
    category: string;
    quantity: number;
  }[];
  createdAt: string;
}

@Component({
  selector: 'widget-category-performance',
  template: '<div [chart]="chart"></div>'
})
export class CategoryPerformanceComponent implements OnChanges {
  @Input() orderCategoryPerformance: any[] = [];

  chart: Chart | undefined;

  ngOnChanges() {
    const filteredData = this.orderCategoryPerformance.filter(order => order.status === "fulfilled");
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

    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Category Performance'
      },
      xAxis: {
        categories: xAxisData
      },
      yAxis: {
        title: {
          text: 'Quantity order'
        }
      },
      series: seriesData.map((series) => ({
        ...series,
        name: categories[seriesData.indexOf(series)]
      })) as Highcharts.SeriesOptionsType[],
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
}

*/