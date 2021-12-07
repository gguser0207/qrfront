import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-businesslogin',
  templateUrl: './businesslogin.component.html',
  styleUrls: ['./businesslogin.component.scss']
})
export class BusinessloginComponent implements OnInit {
  username: string;
  password: string;
  licenseNum: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const businesslogin = {
      username: this.username,
      password: this.password,
      licenseNum: this.licenseNum
    }

    this.authService.authenticatebusiness(businesslogin).subscribe(data => {
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
        this.router.navigate(['/businesslogin']);
      }
    });
  }

}