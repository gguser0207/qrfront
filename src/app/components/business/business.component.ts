import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  
  name: string;
  username: string;
  email: string;
  password: string;
  password1: string;
  password2: string;
  birth: number;
  licenseNum: number;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private router :Router) { }

    ngOnInit(): void {
    }

    onRegisterSubmit(){ 

    const businessuser = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
      birth: this.birth,
      licenseNum: this.licenseNum
      }

    if(!this.validateService.validatebusiness(businessuser)){
      Swal.fire({
        title: "회원가입 실패! ",
        text: "모두 입력해 주세요",
        icon: "error",
        confirmButtonText: "확인",
      });
      return false;
    }

    if (this.password1 !== this.password2) {
      Swal.fire({
        title: "회원가입 실패! ",
        text: '비밀 번호가 일치하지 않습니다',
        icon: "error",
        confirmButtonText: "확인",
      });
      return false;
    }

    if(!this.validateService.validateEmail(businessuser.email)){
      Swal.fire({
        title: "회원가입 실패! ",
        text: '이메일 주소가 올바르지 않습니다',
        icon: "error",
        confirmButtonText: "확인",
      });
      return false;
    }
    
    if(!this.validateService.licensecheck(businessuser.licenseNum)){
      Swal.fire({
        title: "회원가입 실패! ",
        text: '사업자 번호를 확인해주세요!',
        icon: "error",
        confirmButtonText: "확인",
      });
      this.router.navigate(['/business']);
      return false;
    }

    this.authService.businessUser(businessuser).subscribe(data => {
    if(data.success) {
      Swal.fire({
        title: "회원가입 성공! ",
        icon: "success",
        confirmButtonText: "확인",
      });
      this.router.navigate(['/businesslogin']);
    } else {
      Swal.fire({
        title: "회원가입 실패! ",
        text: data.msg,
        icon: "error",
        confirmButtonText: "확인",
        
      });
      this.router.navigate(['/business']);
      return false;
    }
  });
}
}