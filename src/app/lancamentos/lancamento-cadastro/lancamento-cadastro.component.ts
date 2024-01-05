import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Bill, Category, Person } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

export interface PDropDown {
  label: string;
  value: number;
}


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
})
export default class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  categorias: PDropDown[] = [];
  pessoas: PDropDown[] = [];
  bill: Bill = new Bill();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['id'];
    if (codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando(): boolean {
    return Boolean(this.bill.id);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService
      .buscarPorCodigo(codigo)
      .then((lancamento) => {
        if (lancamento) {
          this.bill = lancamento;
        }
      })
      .catch((error) => this.errorHandler.handle(error));
  }

  carregarCategorias() {
    return this.categoriaService
      .listarTodas()
      .then((categorias) => {
        this.categorias = categorias.map((c: Category) => ({
          label: c.name,
          value: c.id,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarPessoas() {
    return this.pessoaService
      .listarTodas()
      .then((pessoas) => {
        this.pessoas = pessoas.map((pessoa: Person) => ({
          label: pessoa.name,
          value: pessoa.id,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  salvar(form: NgForm){
    if(this.editando){
      this.atualizarLancamento(form);
    }else{
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService
      .adicionar(this.bill)
      .then((newBill) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Lançamento criado com sucesso',
        });
        //form.reset();
        //this.bill = new Bill();
        this.router.navigate(['/lancamentos', newBill?.id]);
      })
      .catch((error) => this.errorHandler.handle(error));
  }

  atualizarLancamento(form: NgForm){
    this.lancamentoService.atualizar(this.bill)
    .then(lancamento => {
      if(lancamento){
        this.bill = lancamento;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: "Lançamento alterado com sucesso"
        });
      }
    })
    .catch(error => this.errorHandler.handle(error));
  }

  novo(form: NgForm){
    form.reset();
     setTimeout(() => {
       this.bill = new Bill();
     }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }

}
