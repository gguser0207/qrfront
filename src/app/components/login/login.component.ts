import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const login = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(login).subscribe(data => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.userNoPW);
        Swal.fire({
          title: "로그인 성공! ",
          icon: "success",
          confirmButtonText: "확인",
        });
        this.router.navigate(['']);
      } else {
        Swal.fire({
          title: "로그인 실패! ",
          text: data.msg,
          icon: "error",
          confirmButtonText: "확인",
        });
        this.router.navigate(['/login']);
      }
    });
  }

}
