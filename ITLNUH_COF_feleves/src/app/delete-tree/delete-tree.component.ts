import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeModel } from '../_models/treemodel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-tree',
  templateUrl: './delete-tree.component.html',
  styleUrls: ['./delete-tree.component.scss']
})
export class DeleteTreeComponent implements OnInit {
  trees: TreeModel[] = [];
  snackBar: MatSnackBar;

  constructor(private http: HttpClient, private router: Router, snackBar: MatSnackBar) {
    this.snackBar = snackBar
  }

  ngOnInit(): void {
    this.loadTrees();
  }

  loadTrees(): void {
    this.http.get<TreeModel[]>('http://localhost:5062/Tree/')
      .subscribe(
        (response) => {
          this.trees = response;
          console.log('Datas loaded successfuly:', response);
        },
        (error) => {
          console.error('Error loading datas:', error);
        }
      );
  }

  deleteTree(treeId: string): void {
    this.http.delete(`http://localhost:5062/Tree/${treeId}`)
      .subscribe(
        () => {
          console.log(`Tree deleted successfuly: ${treeId}`);
          this.trees = this.trees.filter(tree => tree.id !== treeId);
          this.snackBar.open("Delete was successful!", "Close", { duration: 5000 })
        },
        (error) => {
          console.error('Error deleting datas', error);
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      );
  }

  updateTree(treeId: string): void {
    this.router.navigate(['/update', treeId]);
  }
}
