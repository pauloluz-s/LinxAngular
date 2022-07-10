import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cliente } from 'src/app/Cliente';
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  clientes!: Cliente[];
  nomeCliente!: string;
  idCliente!: number;

  visibilidadeTabela:boolean = true;
  visibilidadeFormulario:boolean = false;
  modalRef!: BsModalRef;

  constructor(private clientesService: ClientesService,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    // carrega lista de clientes
    this.clientesService.ListarClientes().subscribe(resultado => {
      this.clientes = resultado;
    })
  }

  ExibirFormularioCadastro(): void{

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tituloFormulario = "Novo Cliente";
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      cpf:  new FormControl(null),
      endereco:  new FormControl(null)
    });
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(id: number, nome: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.idCliente = id;
    this.nomeCliente = nome;
  }

  ExcluirCliente(id: number): void {
    this.clientesService.ExcluirCliente(id).subscribe(resultado => {
      this.modalRef.hide();
      alert("Cliente excluído com sucesso");
      this.clientesService.ListarClientes().subscribe( registros => {
        this.clientes = registros;
      });
    });
  }

  ExibirFormularioAtualizacao(id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.clientesService.ObterCliente(id).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`
      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        cpf: new FormControl(resultado.cpf),
        endereco: new FormControl(resultado.endereco)
      });
    });
  }

  EnviarFormulario(): void {
    const cliente: Cliente = this.formulario.value;

    if(cliente.id > 0)
    {
      this.clientesService.AtualizarCliente(cliente).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente atualizado com sucesso');
        this.clientesService.ListarClientes().subscribe(registros => {
          this.clientes = registros;
        });
      });
    }
    else
    {
      this.clientesService.SalvarCliente(cliente).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente inserido com sucesso');
        this.clientesService.ListarClientes().subscribe(registros => {
          this.clientes = registros;
        });
      });
    }
  }

}
