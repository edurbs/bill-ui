import { Component, ErrorHandler, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private errorHandler: ErrorHandler
    ) { }

  ngOnInit(): void {
  }

  salvar(form: NgForm){
    this.pessoaService
      .adicionar(this.person)
      .then(()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pessoa criada com sucesso',
        });
        form.reset();
        this.person = new Person();
      })
      .catch((error) => this.errorHandler.handleError(error));
  }

}
