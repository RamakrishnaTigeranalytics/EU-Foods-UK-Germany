import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];
    public opened_modal:any[] = []

    get_opened_modal(){
        return this.opened_modal
    }
    remove_last_modal(){
        this.opened_modal.pop()
    }

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter((x) => x.id !== id);
    }

    open(id: string) {
        if(!this.opened_modal.includes(id)){
            this.opened_modal.push(id);
        }
        
        // console.log("opening modal" , id)
        // console.log(this.opened_modal , "opened modal")
        // open modal specified by id
        const modal = this.modals.find((x) => x.id === id);
        modal.open();
    }

    close(id: string) {
    //    this.remove_last_modal()
        // console.log("closing modal" , id)
        // close modal specified by id
        const modal = this.modals.find((x) => x.id === id);
        modal.close();
    }
}
