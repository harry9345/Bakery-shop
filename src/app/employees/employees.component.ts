import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  form: FormGroup;
  employee: Employee[] = [];
  submitted = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    // Getting the list of employee
    this.employeeService.getEmployees().subscribe((list: any) => {
      this.employee = list.data;
    });
  }

  private initForm(): void {
    // TODO: Add validations
    const reg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"; // Avatar Url validators

    this.form = this.fb.group({
      id: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      first_name: ["", [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      email: ["", [Validators.required, Validators.email]],
      avatar: ["", [Validators.required, Validators.pattern(reg)]],
    });
  }

  // Function to checking errors
  get f() {
    return this.form.controls;
  }

  // TODO: Addz an employee to the table
  addEmployee(): void {
    const newEmployee: Employee = {
      id: this.form.get("id").value,
      first_name: this.form.get("first_name").value,
      email: this.form.get("email").value,
      avatar: this.form.get("avatar").value,
    };

    // stop here if form is invalid
    if (this.form.status === "INVALID") {
      this.submitted = true;
    } else {
      this.submitted = false;
      this.employee.push(newEmployee);
    }
    this.initForm();
  }

  // TODO: Delete an employee from the table
  deleteEmployee(id: number): void {
    for (let i = 0; i < this.employee.length; ++i) {
      if (this.employee[i].id === id) {
        this.employee.splice(i, 1);
      }
    }
  }
}
