import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TreeModel } from '../_models/treemodel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-tree',
  templateUrl: './update-tree.component.html',
  styleUrls: ['./update-tree.component.scss']
})
export class UpdateTreeComponent implements OnInit {
  treeForm: FormGroup;
  treeId: string;
  snackBar: MatSnackBar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    snackBar: MatSnackBar
  )
  {
    this.snackBar = snackBar
    this.treeId = ""
    this.treeForm = this.fb.group({
      speciesName: ['', Validators.required],
      family: ['', Validators.required],
      order: ['', Validators.required],
      class: ['', Validators.required],
      speciesCode: ['', Validators.required],
      leafType: ['', Validators.required],
      heightAtMaturity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.treeId = id
    }
    else {
      this.snackBar.open("Couldn't load tree, please try again!", "Close", { duration: 5000 })
      this.router.navigate(['/delete']);
    }

    this.loadTree(this.treeId);
  }

  loadTree(id: string): void {
    this.http.get<TreeModel>(`http://localhost:5062/Tree/${id}`)
      .subscribe(
        (response) => {
          this.treeForm.patchValue(response);
          console.log('Datas loaded successfuly:', response);
        },
        (error) => {
          console.error('Error loading datas:', error);
          this.snackBar.open("Couldn't load tree, please try again!", "Close", { duration: 5000 })
          this.router.navigate(['/delete']);
        }
      );
  }

  onSubmit(): void {
    if (this.treeForm.valid) {
      const updatedTree: TreeModel = this.treeForm.value;
      updatedTree.id = this.treeId
      this.http.put(`http://localhost:5062/Tree/`, updatedTree)
        .subscribe(
          () => {
            console.log(`Tree updated successfuly`);
            this.snackBar.open("Update was successful!", "Close", { duration: 5000 })
            this.router.navigate(['/delete']);
          },
          (error) => {
            console.log(`Error updating tree:`, error, updatedTree);
            this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
          }
        );
    } else {
      this.snackBar.open("Please fill every field", "Close", { duration: 5000 })
    }
  }
}
