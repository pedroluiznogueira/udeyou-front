import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  cursos: Curso[] = [];
  valorTotal?: number;

  constructor() {
   }

  ngOnInit(): void {
    this.mostrarCursosCarrinho();
    this.valorTotal = this.calcularTotal();
    render(
      { 
        id: "#myPaypalButtons",
        currency: "USD",
        value: "100.0", 
        onApprove: (detais) => {
          alert("Transaction Sucessfull")
        }
      }
    );    
  }

  public mostrarCursosCarrinho(): void {
    this.cursos = JSON.parse(sessionStorage.getItem("cursos")!);
  }

  public calcularTotal(): number {
    let valor = 0;

    for (let curso of this.cursos) {
      valor += curso.valor!;
    }
    return valor;
  }

}