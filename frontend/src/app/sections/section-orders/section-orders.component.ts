import { Component, OnInit } from "@angular/core";
import { Order } from "../../shared/order";

@Component({
  selector: "app-section-orders",
  templateUrl: "./section-orders.component.html",
  styleUrls: ["./section-orders.component.css"],
})
export class SectionOrdersComponent implements OnInit {
  constructor() {}

  orders: Order[] = [
    {
      id: 1,
      customer: {
        id: 1,
        name: "Milos Mandic",
        state: "SRB",
        email: "mandic@gmail.com",
      },
      total: 230,
      placed: new Date(2018, 12, 1),
      fulfilled: new Date(2018, 12, 3),
    },
    {
      id: 1,
      customer: {
        id: 1,
        name: "John Doe",
        state: "UK",
        email: "johnDoe@gmail.com",
      },
      total: 230,
      placed: new Date(2012, 11, 21),
      fulfilled: new Date(2018, 12, 3),
    },
    {
      id: 1,
      customer: {
        id: 1,
        name: "Liv Risa Ritter",
        state: "GER",
        email: "liv.ritter@gmail.com",
      },
      total: 230,
      placed: new Date(2018, 12, 1),
      fulfilled: new Date(2018, 12, 3),
    },
    {
      id: 1,
      customer: {
        id: 1,
        name: "Joaqim Murat",
        state: "FRA",
        email: "king.murat@gmail.com",
      },
      total: 230,
      placed: new Date(2018, 12, 1),
      fulfilled: new Date(2018, 12, 3),
    },
  ];

  ngOnInit(): void {
  }
}
