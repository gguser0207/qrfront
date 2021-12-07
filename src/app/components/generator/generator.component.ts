import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent implements OnInit{
  Suser: string;
  user = Object;
  kr_curr: any;
  createdCode = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.user = profile.user;

        const curr = new Date();
        const utc = profile.user.time + curr.getTimezoneOffset() * 60 * 1000;
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        this.kr_curr = new Date(utc + KR_TIME_DIFF);

        setInterval(() => {
          this.kr_curr = new Date();
        }, 1000);

        this.Suser = JSON.stringify(profile.user);
        this.createdCode = this.Suser;
        console.log(this.createdCode);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}