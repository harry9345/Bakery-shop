import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductService } from "./product.service";
import { Product } from "./product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  form: FormGroup;
  products: Product[] = [];
  public ascNumberSort = true; // Sorting variable

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.initForm();
    this.productService.getProducts().subscribe((products) => {
      this.products = products; // TODO: Order the products by price Form lowest to highest
      this.products.sort((a, b) => a.price - b.price);
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [""],
      price: [""],
      quantity: [""],
      store: [""],
    });
  }

  addProduct(): void {
    const newProduct: Product = {
      name: this.form.get("name").value,
      price: this.form.get("price").value,
      quantity: this.form.get("quantity").value,
      store: this.form.get("store").value,
    };
    this.products.push(newProduct);
    this.initForm();
  }
  // Function for changing quantities less than 3
  public getColor(quantity: number): string {
    return quantity < 4 ? "red" : "black";
  }

  // Function for sorting
  public sortPriceColumn(): void {
    this.ascNumberSort = !this.ascNumberSort;
    if (this.ascNumberSort) {
      this.products.sort((a, b) => a.price - b.price); // For ascending sort
    } else {
      this.products.sort((a, b) => b.price - a.price); // For descending sort
    }
  }
}
