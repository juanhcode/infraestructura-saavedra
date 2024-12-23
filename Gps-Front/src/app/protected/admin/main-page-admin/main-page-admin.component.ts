import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, map, tap } from 'rxjs';
import {  ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-page-admin',
  templateUrl: './main-page-admin.component.html',
  styleUrls: ['./main-page-admin.component.css']
})
export class MainPageAdminComponent implements OnInit,OnDestroy{

  currentUrl!: string;
  sideNavStatus: boolean = false;
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

  getUrl(){
    return this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url)
    )
  }
  getArgumentos() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      tap(this.getUrl().subscribe((url)=>{
        this.currentUrl= url;
      })),
      map((event: ActivationEnd) => event.snapshot.data)
    )

  }
}
