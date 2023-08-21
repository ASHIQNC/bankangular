import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deletechild',
  templateUrl: './deletechild.component.html',
  styleUrls: ['./deletechild.component.css'],
})
export class DeletechildComponent {
  //create a variable to accept data from parent componenet
  //nammal evide undefined ennn kodukkanm kaaranam parentinn verunna data aanu athava parent akath ninn undefined aan verunenkilum accept cheyyanm
  //parent akathulla data child akath verunnathin aanu @input decorator use aakum
  //childinn parentilekk aanu data pokunnnath enkil @output decorator use aakum

  @Input() childAcno: String | undefined;

  //event creation(object creation),ennit oru onCancel enna variabil vilikka
  //ee eventint parentint akath aanu vendi so we are using @output decorator in order to share the data to parent from child component
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  constructor() {}
  noClick() {
    //ee function vilikumpolaaan ee event emit aakuka
    this.onCancel.emit();
  }

  acountDelete() {
    //enthenkilm data pass cheyhtaal ath doller event aanu
    this.onDelete.emit(this.childAcno);
  }
}
