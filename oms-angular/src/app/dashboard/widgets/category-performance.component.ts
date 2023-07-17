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
  
    const topCategories = sortedCategories.slice(0, 5).map((category, index) => ({
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
        height: 375
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