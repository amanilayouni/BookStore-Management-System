import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPasswordForm: any = FormGroup;
  responseMesssage: any;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private Snackbarservice: SnackbarService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ForgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]

    });
  }


  handleSubmit() {
    this.ngxService.start();
    var formData = this.ForgotPasswordForm.value;
    var data = {
    
      email: formData.email
    
    }
    this.userService.forgotPassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMesssage = response?.message;
      this.Snackbarservice.openSnackBar(this.responseMesssage, "");
     
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMesssage = error.error?.message;
      }
      else {
        this.responseMesssage = GlobalConstants.genericError;

      }
      this.Snackbarservice.openSnackBar(this.responseMesssage, GlobalConstants.error);

    })
  }

}
