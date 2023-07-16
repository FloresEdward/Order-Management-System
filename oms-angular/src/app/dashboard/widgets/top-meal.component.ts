import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

interface DataObject {
  orderedItems: {
    product: string;
    quantity: number;
  }[];
}

@Component({
  selector: 'widget-top-meal',
  template: '<div [chart]="chart"></div>'
})
export class TopMealComponent implements OnChanges {

  @Input() orderTopMeal: any[] = [];

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
    this.filteredFulfilledData = this.orderTopMeal.filter(order => order.status === "fulfilled");
    const topMeals = this.getTopMeals(this.filteredFulfilledData);
    this.updateChart(topMeals, this.colors);
  }

  getTopMeals(data: DataObject[]): { product: string; totalQuantity: number; color: string }[] {
    const productMap: { [product: string]: number } = {};
    data.forEach((obj) => {
      obj.orderedItems.forEach((item) => {
        if (productMap[item.product]) {
          productMap[item.product] += item.quantity;
        } else {
          productMap[item.product] = item.quantity;
        }
      });
    });

    const sortedMeals = Object.keys(productMap).sort(
      (a, b) => productMap[b] - productMap[a]
    );

    const topMeals = sortedMeals.slice(0, 5).map((product, index) => ({
      product,
      totalQuantity: productMap[product],
      color: this.colors[index],
    }));

    return topMeals;
  }

  updateChart(topMeals: { product: string; totalQuantity: number; color: string }[], colors: string[]) {
    const seriesData = topMeals.map((product) => ({
      name: product.product,
      y: product.totalQuantity,
      color: product.color
    }));

    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 250,
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: 'Top Meal Orders'
      },
      plotOptions: {
        pie: {
          showInLegend: true,
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
      },
      series: [
        {
          type: 'pie',
          data: seriesData
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
