import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/shared/empleado.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor(public service : EmpleadoService,
    private firestore:AngularFirestore,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form! = null)
      form.resetForm();
    this.service.formData = {
      id : null,
      nombre : '',
      posicion : '',
      mail : '',
    }
  }

  onSubmit(form:NgForm){
    let data =Object.assign({},form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('empleados').add(data);
    else
    this.firestore.doc('empleados/'+ form.value.id).update(data);
      this.resetForm(form);
    this.toastr.success('Enviado con Exito','Registrarse')
  }

}
