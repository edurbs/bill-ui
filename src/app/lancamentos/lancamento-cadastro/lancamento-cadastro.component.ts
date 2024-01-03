import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

export interface Category {
  id: number;
  name: string;
};

export interface Person{
  id: number;
  name: string;
  active: boolean;
  address: Address;
}

export interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  pobox: string;
}

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
    {label: 'Receita', value:'RECEITA'},
    {label: 'Despesa', value:'DESPESA'}
  ];

  categorias: PDropDown[] = [];

  pessoas: PDropDown[] = [];

  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().then(categorias => {
      this.categorias = categorias.map((c: Category) => ({label: c.name, value: c.id}));
    }).catch(erro => {
      this.errorHandler.handle(erro)
    })
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas()
    .then(pessoas => {
        this.pessoas = pessoas.map((pessoa: Person)=>({label: pessoa.name, value: pessoa.id}));
    }).catch(erro => {
      this.errorHandler.handle(erro);
    });
  }
}
