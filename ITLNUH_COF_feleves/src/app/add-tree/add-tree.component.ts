import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeModel } from '../_models/treemodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-tree',
  templateUrl: './add-tree.component.html',
  styleUrls: ['./add-tree.component.scss']
})
export class AddTreeComponent {
  treeForm: FormGroup;
  snackBar: MatSnackBar;

  constructor(private http: HttpClient, private fb: FormBuilder, snackBar: MatSnackBar) {
    this.snackBar = snackBar
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

  onSubmit(): void {
    if (this.treeForm.valid) {
      const newTree: TreeModel = this.treeForm.value;
      this.http.post<TreeModel>('http://localhost:5062/Tree/', newTree)
      .subscribe(
        (success) => {
          console.log(`Tree deleted successfuly`);
          this.snackBar.open("Create was successful!", "Close", { duration: 5000 })
          this.treeForm.reset()
        },
        (error) => {
          console.log(`Error creating tree`);
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )
    } else {
      this.snackBar.open("Please fill every field", "Close", { duration: 5000 })
    }
  }
}
