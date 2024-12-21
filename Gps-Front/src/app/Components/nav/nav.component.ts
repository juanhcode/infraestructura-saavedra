import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { User } from 'src/app/auth/interfaces/interface';
import { OrderService } from 'src/app/protected/order/services/order.service';
import { Detail_Order } from 'src/app/protected/order/interfaces/interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],


})
export class NavComponent implements OnInit {
  amontCartProductSelected: number = 0;
  amountOrders: number = 0;
  totalDetailOrder: number = 0;
  public backgroundImg: SafeStyle | undefined = undefined;
  showButtonOrder: boolean = false;
  showButtonCart: boolean = false;
  details_order: Detail_Order[] = [];
  urlImage: string = "../../../assets/user.png"
  userName: string | undefined;
  @Input() showCard: boolean = true;
  @Input() showComponents: boolean = true;
  @Input() currentUrl: string = '';
  @Input() iconTitle: string = "";
  @Input() showBreadCrumb: boolean = true;
  @Input() titulo?: string;
  email: string | undefined;
  user?: User;
  imageUrl: string = `${environment.baseURLIMG}/profiles/`;
  constructor(private router: Router, private authService: AuthService, private orderService: OrderService, private sanitizer: DomSanitizer) {
    this.user = this.authService.user;
    if (Object.keys(this.user).length !== 0) {
      this.userName = `${this.user.name} ${this.user.surname}`;
      this.email = this.user.email;
      if (this.authService.user.image) {
        this.imageUrl += this.authService.user.image;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.imageUrl + ')');
      }
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.urlImage + ')');
    } else {
      this.user = undefined;
    }
  }
  ngOnInit(): void {
    if (this.user?.rol === 'cliente') {
      this.orderService.getcountdetailOrder(this.user.uid!).subscribe(
        res => {
          if (res.ok === true) {
            this.amontCartProductSelected = res.count!;
            this.details_order = res.rows || [];
            if(this.details_order.length > 0){
              for (const detailOrder of this.details_order) {
                this.totalDetailOrder=+ detailOrder.price!
              }
            }
          }
        });
      this.orderService.setupSocketConnection();
      this.orderService.socket.on('detailsOrder', (details: any) => {
        this.amontCartProductSelected = details.count!;
        this.details_order = details.rows || [];
        if(this.details_order.length > 0){
          for (const detailOrder of this.details_order) {
            this.totalDetailOrder=+ detailOrder.price!
          }
        }
      })
      this.showButtonCart = true;
    }
    if (this.user?.rol === 'administrador') {
      this.orderService.getcountOrders().subscribe((resp) => {
        if (resp.ok === true) {
          this.amountOrders = resp.count!;
        }
      }
      );
      this.orderService.setupSocketConnection();
      this.orderService.socket.on('orders', (countOrders: any) => {
        this.amountOrders = countOrders;
      });
      this.showButtonOrder = true;
    }
  }

  logOut(): void {
    if (this.authService.user.rol === "administrador" || this.authService.user.rol === "cliente") {
      this.orderService.socket.disconnect();
    }
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  items = [
    {
      number: '1',
      name: 'cliente',
      acessRole: 'administrador',
      icon: 'fa-sharp fa-solid fa-users'
    },
    {
      number: '2',
      name: 'venta',
      acessRole: 'administrador',
      icon: 'fa-solid fa-cart-arrow-down'
    },
    {
      number: '3',
      name: 'producto',
      acessRole: 'administrador',
      icon: 'fa-sharp fa-solid fa-mug-saucer'
    },
    {
      number: '4',
      name: 'proveedor',
      acessRole: 'administrador',
      icon: 'fa-solid fa-handshake'
    },
    {
      number: '5',
      name: 'gasto',
      acessRole: 'administrador',
      icon: 'fa-solid fa-sack-dollar'
    },
    {
      number: '6',
      name: 'manufactura',
      acessRole: 'empleado',
      icon: 'fa-solid fa-person-digging'
    },
    {
      number: '7',
      name: 'empleado',
      acessRole: 'administrador',
      icon: 'fa-solid fa-users-gear'
    },
    {
      number: '8',
      name: 'estadistica',
      acessRole: 'administrador',
      icon: 'fa-sharp fa-solid fa-chart-simple'
    }
  ]

  url(url: string) {

    if (this.user === undefined) {
      this.router.navigateByUrl(`${url}`);
    } else {
      this.router.navigateByUrl(`${this.user?.rol}/${url}`);
    }

  }

  sendUrl(sidenav: any, url: string) {
    sidenav.toggle()
    this.router.navigateByUrl(`${this.authService.user.rol}/${url}`);
  }

  changeToogle(sidenav: any) {
    if (sidenav !== undefined) {
      sidenav.toggle()
    }
  }

}

