import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterViewInit {

  @ViewChild(MatDrawer) drawer: MatDrawer;
  displayName: String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackbarService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['home']);
    this.getDisplayNameUserLogged();
    this.setDisplayName();
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      if (result.matches) {
        this.drawer.close();
      } else if (!this.drawer.opened) {
        this.drawer.open();
      }
    });
  }

  getDisplayNameUserLogged() {
    this.userService.getUserLogged().subscribe(res => {
      if (res && res.displayName) {
        this.displayName = res.displayName;
      }
    });
  }

  setDisplayName() {
    this.userService.displayName$.subscribe(newValue => {
      this.displayName = newValue;
    });
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.snackBar.open('Logout realizado com sucesso', 'snackbar-sucess');
  }

  profile() {
    this.router.navigate(['user-profile']);
  }

}
