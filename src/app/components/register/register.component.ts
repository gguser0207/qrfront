import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  password1: string;
  password2: string;
  birth: number;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private router :Router) { }

    ngOnInit(): void {
    }

    onRegisterSubmit(){ 

    if (this.password1 !== this.password2) {
      Swal.fire({
        title: "회원가입 실패! ",
        text:"패스워드가 다릅니다. 다시 입력하세요",
        icon: "error",
        confirmButtonText: "확인",
      });
      return false;
    }

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
      birth: this.birth
      }

    
    if(!this.validateService.validateRegister(user)){   
      Swal.fire({
        title: "회원가입 실패! ",
        text:"모두 입력해 주세요",
        icon: "error",
        confirmButtonText: "확인",
      });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      Swal.fire({
        title: "회원가입 실패! ",
        text: '이메일 주소가 올바르지 않습니다',
        icon: "error",
        confirmButtonText: "확인",
      });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        Swal.fire({
          title: "회원가입 성공! ",
          icon: "success",
          text: data.msg,
          confirmButtonText: "확인",
        });
        this.router.navigate(['/login']);
      } else {
        Swal.fire({
          title: "회원가입 실패! ",
          text: data.msg,
          icon: "error",
          confirmButtonText: "확인",
        });
        this.router.navigate(['/register']);
      }
    });
  }


}