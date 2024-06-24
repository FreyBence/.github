import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeModel } from '../_models/treemodel';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  trees: TreeModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http.get<TreeModel[]>('http://localhost:5062/Tree/').subscribe(
      (response: TreeModel[]) => {
        this.trees = response;
        console.log('Datas loaded successfuly:', response);
        
        this.createPieChart('familyCountChart', this.get_tree_count_by_family(this.trees), 'Tree count by family');
        this.createPieChart('familyClassesChart', this.get_class_count_by_family(this.trees), 'Class count by family');
        this.createPieChart('familyAverageHeightChart', this.get_family_average_height(this.trees), 'Average height by family');
      },
      (error) => {
        console.error('Error loading datas:', error);
      }
    );
  }

  get_tree_count_by_family(data: TreeModel[]): { [key: string]: number } {
    const familyCount = data.reduce((acc: { [key: string]: number }, tree) => {
      acc[tree.family] = (acc[tree.family] || 0) + 1;
      return acc;
    }, {});
    return familyCount;
  }

  get_class_count_by_family(data: TreeModel[]): { [key: string]: number } {
    const familyClassesCount = data.reduce(
      (acc: { [key: string]: Set<string> }, tree) => {
        if (!acc[tree.family]) {
          acc[tree.family] = new Set();
        }
        acc[tree.family].add(tree.class);
        return acc;
      },
      {}
    );

    return Object.fromEntries(
      Object.entries(familyClassesCount).map(([family, classes]) => [
        family,
        classes.size,
      ])
    );
  }

  get_family_average_height(data: TreeModel[]): { [key: string]: number } {
    const familyHeightSum = data.reduce(
      (
        acc: { [key: string]: { totalHeight: number; count: number } },
        tree
      ) => {
        if (!acc[tree.family]) {
          acc[tree.family] = { totalHeight: 0, count: 0 };
        }
        acc[tree.family].totalHeight += tree.heightAtMaturity;
        acc[tree.family].count += 1;
        return acc;
      },
      {}
    );

    const familyAverageHeight = Object.keys(familyHeightSum).reduce(
      (acc: { [key: string]: number }, family) => {
        acc[family] =
          familyHeightSum[family].totalHeight / familyHeightSum[family].count;
        return acc;
      },
      {}
    );

    return familyAverageHeight;
  }

  createPieChart(chartId: string, dataObject: any, label: string) {
    const labels = Object.keys(dataObject);
    const dataValues = Object.values(dataObject);

    new Chart(chartId, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: dataValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: label,
          },
        },
      },
    });
  }
}
