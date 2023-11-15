import { Injectable } from '@angular/core';

interface IModal {
  id: string,
  visible: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: IModal[] = [];


  constructor() { }

  register(id: string): void {
    this.modals.push({
      id: id,
      visible: false
    })
  }

  unregister(id: string): void {
    this.modals = this.modals.filter(
      element => element.id !== id
    );
  }

  isModalOpen(id: string): boolean{
    return Boolean(this.modals.find(element => element.id === id)?.visible);
  }

  toggleModal(id: string): void {
    let modal =  this.modals.find(element => element.id === id);
    if(modal){
      modal.visible = !modal.visible;
    }
  }
}
