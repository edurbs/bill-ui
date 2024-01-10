import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
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
  //bill: Bill = new Bill();
  formulario!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');
    const codigoLancamento = this.route.snapshot.params['id'];
    if (codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      id: [],
      type: ['RECEITA', Validators.required],
      dueDate: [null, Validators.required],
      payDate: [],
      description: [null, [Validators.required, Validators.minLength(5)]],
      amount: [null, Validators.required],
      person: this.formBuilder.group({
        id: [null, Validators.required],
        name: [],
      }),
      category: this.formBuilder.group({
        id: [null, Validators.required],
        name: []
      }),
      notes: []
    });
  }

  get editando(): boolean {
    return Boolean(this.formulario.get('id')?.value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService
      .buscarPorCodigo(codigo)
      .then((lancamento) => {
        if (lancamento) {
          this.formulario.patchValue(lancamento);
          this.atualizarTituloEdicao();
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

  salvar(){
    if(this.editando){
      this.atualizarLancamento();
    }else{
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService
      .adicionar(this.formulario.value)
      .then((newBill) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Lançamento criado com sucesso',
        });
        this.router.navigate(['/lancamentos', newBill?.id]);
      })
      .catch((error) => this.errorHandler.handle(error));
  }

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {
      if(lancamento){
        this.formulario.patchValue(lancamento);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: "Lançamento alterado com sucesso"
        });
        this.atualizarTituloEdicao();
      }
    })
    .catch(error => this.errorHandler.handle(error));
  }

  novo(){
    this.formulario.reset();
    this.formulario.patchValue(new Bill());
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`);
  }

}
