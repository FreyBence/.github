import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeModel } from '../_models/treemodel';

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
    console.log(this.trees)
  }

  getData(): void {
    this.http.get<TreeModel[]>('http://localhost:5062/Tree/').subscribe(
      (response: TreeModel[]) => {
        this.trees = response;
        console.log('Datas loaded successfuly:', response);
      },
      (error) => {
        console.error('Error loading datas:', error);
      }
    );
  }
}
