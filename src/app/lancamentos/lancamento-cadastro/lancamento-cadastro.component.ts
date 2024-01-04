import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
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

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.bill)
      .then(()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Lançamento criado com sucesso',
        })
        form.reset();
        this.bill = new Bill();
      })
      .catch(error => this.errorHandler.handle(error));

  }


}
