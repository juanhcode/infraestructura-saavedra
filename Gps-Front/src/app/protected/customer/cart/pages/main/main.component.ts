import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit,OnDestroy {
  tituloSubs?: Subscription;
  titulo?: string;
  iconTitle:string=""
  showCard:boolean= true;

  constructor(private router: Router) {
    this.getArgumentos().subscribe((data)=>{
      this.titulo=data['titulo'];
      this.iconTitle = data['icon'];
      if(data['showCard']==false){
       this.showCard = false;
      }else{
        this.showCard = true;
      }
    })


  }
  ngOnDestroy(): void {
    this.tituloSubs?.unsubscribe();
  }
  ngOnInit(): void {
  }


  getArgumentos() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )

  }
}
