import { Component, ErrorHandler, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Person } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  person: Person = new Person();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova pessoa');
    const codigoPessoa = this.route.snapshot.params['id'];
    if(codigoPessoa && codigoPessoa!=='novo'){
      this.carregarPessoa(codigoPessoa);
    }
  }
  carregarPessoa(codigoPessoa: Number) {
    this.pessoaService.buscarPorCodigo(codigoPessoa)
      .then((pessoa)=>{
        if(pessoa){
          this.person = pessoa;
          this.atualizarTituloEdicao();
        }
      })
      .catch((error) => this.errorHandler.handleError(error));
  }

  adicionar(form: NgForm){
    this.pessoaService
      .adicionar(this.person)
      .then((newPerson)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pessoa criada com sucesso',
        });
        this.router.navigate(['/pessoas', newPerson?.id])
      })
      .catch((error) => this.errorHandler.handleError(error));
  }

  atualizar(form: NgForm){
    this.pessoaService
      .atualizarPessoa(this.person)
      .then((newPerson)=>{
        if(newPerson){
          this.person = newPerson;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pessoa atualizada com sucesso'
        });
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandler.handleError(error));
  }

  atualizarStatus(form: NgForm){
    this.pessoaService.atualizarStatus(this.person)
      .then(person => {
        if(person){
          this.person = person;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Status atualizado com sucesso'
          });
          this.atualizarTituloEdicao();
        }

      })
      .catch(error => this.errorHandler.handleError(error));
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.person.name}`);
  }

  get editando(): Boolean {
   return (Boolean(this.person.id));
  }

  salvar(form: NgForm){
    if(this.editando){
      this.atualizar(form);
    }else{
      this.adicionar(form);
    }
  }

  novo(form: NgForm){
    form.reset()
    this.person = new Person();
    this.router.navigate(["/pessoas/novo"]);
  }

}
